export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateMonthlyInstallment(totalPrice: number, months: number = 12): number {
  // 0% interest rate installment calculation
  return Math.round(totalPrice / months);
}

export interface SimulationParams {
  riderWeightKg: number; // 50 - 100
  mode: 'eco' | 'drive' | 'sport' | 'race';
  temperatureC: number; // 15 - 40
  terrain: 'flat' | 'slight_hill' | 'steep';
}

export function simulateVehiclePerformance(baseRange: number, baseTopSpeed: number, params: SimulationParams) {
  // Baseline is measured for 70kg rider on flat road at 25°C in Eco/Drive mode
  let rangeFactor = 1.0;
  let speedFactor = 1.0;

  // Weight impact (70kg standard): +/- 0.6% range per kg
  const weightDiff = params.riderWeightKg - 70;
  rangeFactor -= (weightDiff * 0.006);

  // Riding mode impact
  switch (params.mode) {
    case 'eco':
      rangeFactor *= 1.15;
      speedFactor *= 0.65;
      break;
    case 'drive':
      rangeFactor *= 1.0;
      speedFactor *= 0.85;
      break;
    case 'sport':
      rangeFactor *= 0.82;
      speedFactor *= 1.0;
      break;
    case 'race':
      rangeFactor *= 0.68;
      speedFactor *= 1.05;
      break;
  }

  // Temperature impact (optimal ~ 25°C)
  if (params.temperatureC < 20) {
    rangeFactor *= (1 - (20 - params.temperatureC) * 0.015);
  } else if (params.temperatureC > 35) {
    rangeFactor *= 0.95;
  }

  // Terrain impact
  if (params.terrain === 'slight_hill') {
    rangeFactor *= 0.85;
  } else if (params.terrain === 'steep') {
    rangeFactor *= 0.68;
    speedFactor *= 0.90;
  }

  const estimatedRange = Math.max(8, Math.round(baseRange * rangeFactor));
  const estimatedTopSpeed = Math.min(baseTopSpeed * 1.05, Math.round(baseTopSpeed * speedFactor));

  return {
    estimatedRange,
    estimatedTopSpeed,
    batteryEfficiency: Math.round(Math.min(100, Math.max(40, rangeFactor * 100)))
  };
}
