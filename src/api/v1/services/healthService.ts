export function getHealth(version: string) {
  return {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version,
  };
}
