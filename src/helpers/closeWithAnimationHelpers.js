/**
 * Fecha um componente com uma animação.
 * @param {Function} setIsClosing - Função para definir o estado de fechamento.
 * @param {Function} setOpenState - Função para definir o estado de abertura.
 * @param {number} duration - Duração da animação em milissegundos.
 */

export const closeWithAnimationHelpers = (
  setIsClosing,
  setOpenState,
  duration = 100
) => {
  setIsClosing(true);
  setTimeout(() => {
    setOpenState(false);
    setIsClosing(false);
  }, duration);
};
