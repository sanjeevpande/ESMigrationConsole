export const caption = 'Ongoing status';

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
        key: 'status',
        content: 'Status',
        width: 20
      },
      {
        key: 'refresh',
        content: 'Refresh Status',
        width: 10
      }
    ],
  };
};

export const head = createHead();