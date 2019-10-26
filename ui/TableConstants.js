export const caption = 'Migration Status';

export const createHead = () => {
  return {
    cells: [
      {
        key: 'tenantId',
        content: 'Tenant Id',
        width: 40
      },
      {
        key: 'indexType',
        content: 'Index Type',
        width: 20
      },
      {
        key: 'checkStatus',
        content: 'Check Status',
        width: 20
      },
      {
        key: 'stop',
        content: 'Stop Reindexing',
        width: 10
      }
    ],
  };
};

export const head = createHead();