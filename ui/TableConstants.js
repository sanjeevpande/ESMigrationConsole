export const caption = 'Migration Status';

export const createHead = () => {
  return {
    cells: [
      {
        key: 'tenantId',
        content: 'Tenant Id',
        width: 30
      },
      {
        key: 'indexType',
        content: 'Index Type',
        width: 30
      },
      {
        key: 'checkStatus',
        content: 'Check Status',
        width: 30
      },
      {
        key: 'cancel',
        content: 'Cancel',
        width: 10
      }
    ],
  };
};

export const head = createHead();