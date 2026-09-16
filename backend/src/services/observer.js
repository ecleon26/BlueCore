function clampNumber(n, min, max, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.max(min, Math.min(max, v));
}

function ratePerSec(nowState, prevState, key) {
  if (!nowState || !prevState) return null;
  const dt = clampNumber(nowState.t - prevState.t, 1, 99999, 1);
  const dv = Number(nowState[key]) - Number(prevState[key]);
  if (!Number.isFinite(dv)) return null;
  return dv / dt;
}

function pickNextAction({ state, activeEvents }) {
  const morale = state?.morale ?? 0;
  const reputation = state?.reputation ?? 0;
  const cash = state?.cash ?? 0;
  const debt = state?.debt ?? 0;

  // If there is an unresolved event, the "next action" is to resolve it.
  if (Array.isArray(activeEvents) && activeEvents.length > 0) {
    const e = activeEvents[0];
    // Map known events to the actionId that resolves them.
    const resolveMap = {
      factory_accident: { actionId: 'safety_protocol', buildingType: 'factory' },
      staff_strike: { actionId: 'resolve_strike', buildingType: 'hr' },
      competitor_launch: { actionId: 'counter_campaign', buildingType: 'media' },
      supply_crisis: { actionId: 'logistics_fix', buildingType: 'warehouse' },
      rd_breach: { actionId: 'security_patch', buildingType: 'rd' },
      market_opportunity: { actionId: 'surge_broadcast', buildingType: 'media' }
    };
    const mapped = resolveMap[e.id];
    if (mapped) return { ...mapped, why: `Resolve ${e.title || e.id} to stop the penalty.` };
    return { actionId: 'resolve_event', buildingType: 'SYSTEM', why: 'Resolve the active event penalty.' };
  }

  // No active event: prioritize survival constraints.
  if (morale < 35) {
    if (cash >= 2000) return { actionId: 'bonus', buildingType: 'hr', why: 'Morale is dangerously low; morale scales all revenue.' };
    return { actionId: 'hire_staff', buildingType: 'hr', why: 'Morale is low; hiring can stabilize morale.' };
  }

  if (reputation < 45) {
    return { actionId: 'pr_statement', buildingType: 'media', why: 'Reputation is low; PR protects consumer revenue.' };
  }

  // Debt pressure: if in debt and cash is positive but slow, prefer paying it down via avoiding new loans.
  if (debt > 0 && cash < 2000) {
    return { actionId: 'marketing_campaign', buildingType: 'media', why: 'Increase reputation/morale to lift revenue and escape debt interest.' };
  }

  // Otherwise: invest in upgrades.
  if ((state?.factoryMult ?? 1) < 1.5 && cash >= 5000) {
    return { actionId: 'expand_prod', buildingType: 'factory', why: 'Factory upgrades provide strong revenue scaling.' };
  }
  if ((state?.warehouseMult ?? 1) < 1.5 && cash >= 4000) {
    return { actionId: 'storage_upgrade', buildingType: 'warehouse', why: 'Warehouse upgrades improve logistics revenue.' };
  }
  if ((state?.rdMult ?? 1) < 1.5 && cash >= 3000) {
    return { actionId: 'research', buildingType: 'rd', why: 'R&D upgrades compound over time.' };
  }

  return { actionId: 'optimize', buildingType: 'hq', why: 'A safe default: morale improves all revenue.' };
}

export function computeObserverContext(sessionCtx) {
  const state = sessionCtx?.state || null;
  const prevState = sessionCtx?.prevState || null;
  const activeEvents = sessionCtx?.activeEvents || [];

  const cashPerSec = ratePerSec(state, prevState, 'cash');
  const revenuePerSec = ratePerSec(state, prevState, 'revenue');

  const flags = {
    cashCritical: (state?.cash ?? 0) < 0,
    moraleCritical: (state?.morale ?? 0) < 35,
    repCritical: (state?.reputation ?? 0) < 45,
    debtActive: (state?.debt ?? 0) > 0,
    eventActive: activeEvents.length > 0
  };

  const mistakes = [];
  if (flags.eventActive) mistakes.push({ code: 'UNRESOLVED_EVENT', why: 'Active event penalties are draining performance.' });
  if (flags.moraleCritical) mistakes.push({ code: 'LOW_MORALE', why: 'Morale is low; it scales all revenue down.' });
  if (flags.repCritical) mistakes.push({ code: 'LOW_REPUTATION', why: 'Reputation is low; consumer revenue is suppressed.' });
  if (flags.debtActive && (state?.cash ?? 0) < 3000) mistakes.push({ code: 'DEBT_PRESSURE', why: 'Debt interest is a constant cash drain.' });

  if (Number.isFinite(cashPerSec) && cashPerSec < 0) mistakes.push({ code: 'NEGATIVE_CASHFLOW', why: 'Cash is trending downward; you may be spiraling.' });

  const next = pickNextAction({ state, activeEvents });

  const playerModel = {
    flags,
    cashPerSec: Number.isFinite(cashPerSec) ? Math.round(cashPerSec) : null,
    revenuePerSec: Number.isFinite(revenuePerSec) ? Math.round(revenuePerSec) : null,
    upgradeFocus: {
      factoryMult: state?.factoryMult ?? 1,
      warehouseMult: state?.warehouseMult ?? 1,
      rdMult: state?.rdMult ?? 1
    },
    risk: clampNumber(
      (flags.eventActive ? 30 : 0) + (flags.moraleCritical ? 25 : 0) + (flags.repCritical ? 20 : 0) + (flags.debtActive ? 10 : 0) + ((state?.cash ?? 0) < -1000 ? 15 : 0),
      0,
      100,
      50
    )
  };

  const situation = {
    headline: flags.eventActive
      ? `Crisis active: ${activeEvents[0]?.title || activeEvents[0]?.id}`
      : (flags.moraleCritical ? 'Morale is the main bottleneck' : (flags.debtActive ? 'Debt is pressuring cash' : 'Stable — focus on scaling')),
    stats: state
      ? {
        cash: Math.round(state.cash),
        revenue: Math.round(state.revenue),
        morale: Math.round(state.morale),
        reputation: Math.round(state.reputation),
        debt: Math.round(state.debt),
        equity: Math.round(state.equity),
        timeLeft: Math.round(state.timeLeft)
      }
      : null,
    rates: {
      cashPerSec: playerModel.cashPerSec,
      revenuePerSec: playerModel.revenuePerSec
    },
    activeEvents,
    mistakes: mistakes.slice(0, 3),
    suggestedNext: { actionId: next.actionId, buildingType: next.buildingType }
  };

  const compactText = `${situation.headline}. ` +
    (state
      ? `Cash=$${Math.round(state.cash)}, Rev=$${Math.round(state.revenue)}, Morale=${Math.round(state.morale)}%, Rep=${Math.round(state.reputation)}%, Debt=$${Math.round(state.debt)}. `
      : '') +
    (mistakes.length ? `Mistakes: ${mistakes.map(m => m.code).join(', ')}. ` : '') +
    `Next: ${next.actionId} @ ${next.buildingType}.`;

  return {
    playerModel,
    situation,
    compactText,
    nextAction: next
  };
}
