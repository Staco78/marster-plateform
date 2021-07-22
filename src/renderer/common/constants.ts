export const blockSize = { width: 32, height: 32 };
export const playerSize = { width: 30, height: 54 };

const zoomFactor = 1;

blockSize.height *= zoomFactor;
blockSize.width *= zoomFactor;
playerSize.height *= zoomFactor;
playerSize.width *= zoomFactor;

export const playerSpeed = 0.6;
export const renderDistance = 3;
export const gravity = 0.05;
export const maxFallSpeed = 2;
export const jumpStrenght = 0.8;
export const collisionDetectionDistance = 2;
