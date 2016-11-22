export const TOGGLE_VENACLE_STORE_MODAL = 'TOGGLE_VENACLE_STORE_MODAL';
export const CLOSE_VENACLE_STORE_MODAL = 'CLOSE_VENACLE_STORE_MODAL';

export function toggleVenacleStoreModal({ data, contentType }) {
  return {
    type: TOGGLE_VENACLE_STORE_MODAL,
    data,
    contentType
  }
}
