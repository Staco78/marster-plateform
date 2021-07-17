export const blockSize = { width: 25, height: 25 };
export const playerSize = { width: 25, height: 50 };

const zoomFactor = 1;

blockSize.height *= zoomFactor;
blockSize.width *= zoomFactor;
playerSize.height *= zoomFactor;
playerSize.width *= zoomFactor;

export const playerSpeed = 0.6;
export const renderDistance = 2;
export const gravity = 0.05;
export const maxFallSpeed = 0.5;
export const jumpStrenght = 0.8;
export const collisionDetectionDistance = 1;
