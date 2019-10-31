export const caption = 'Ongoing status';

export const createHead = () => {
  return {
    cells: [
      {
        key: 'tenantId',
        content: 'Tenant Id',
        width: 50
      },
      {
        key: 'indexType',
        content: 'Index Type',
        width: 25
      },
      {
        key: 'status',
        content: 'Status',
        width: 25
      }
    ],
  };
};

export const head = createHead();