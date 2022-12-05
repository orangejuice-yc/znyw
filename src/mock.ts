import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';
export const treeDataState: DataNode[] = [
    {
      title: '一号线',
      key: 'line-1',
      disabled:true,
      children: [
        {
          title: '车站1',
          key: 'line1-state1'
        },
        {
          title: '车站2',
          key: 'line1-state2'
        },
        {
          title: '车站3',
          key: 'line1-state3'
        },
        {
          title: '车站4',
          key: 'line1-state4'
        },
        {
          title: '车站5',
          key: 'line1-state5'
        },
      ],
    },
    {
      title: '二号线',
      key: 'line-2',
      disabled:true,
      children: [
        {
          title: '车站1',
          key: 'line2-state1'
        },
        {
          title: '车站2',
          key: 'line2-state2'
        },
        {
          title: '车站3',
          key: 'line2-state3'
        },
        {
          title: '车站4',
          key: 'line2-state4'
        },
        {
          title: '车站5',
          key: 'line2-state5'
        },
      ],
    },
  ];

export const treeDataLine: DataNode[] = [
    {
      title: '一号线',
      key: 'line1',
    },
    {
      title: '二号线',
      key: 'line2',
    },
  ];
// interface Price {
//     id: number
//     name: string
//     array: [number?, number?]
// }

// const prices: Price[] = [
//   {
//     id: 0,
//     name: "不限制价格",
//     array: []
//   },
//   {
//     id: 1,
//     name: "1 - 50",
//     array: [1, 50]
//   },
//   {
//     id: 2,
//     name: "51 - 100",
//     array: [51, 100]
//   },
//   {
//     id: 3,
//     name: "101 - 150",
//     array: [101, 150]
//   },
//   {
//     id: 4,
//     name: "151 - 200",
//     array: [151, 200]
//   },
//   {
//     id: 5,
//     name: "201 - 500",
//     array: [201, 500]
//   }
// ]

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
  export const columns: ColumnsType<DataType> = [
    {
      title: '设备名称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    // { title: 'Column 8', dataIndex: 'address', key: '8' },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   fixed: 'right',
    //   width: 100,
    //   render: () => <a>action</a>,
    // },
  ];
  
  export const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `设备 ${i + 1}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }


