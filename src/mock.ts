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
          key: '一号线-车站1'
        },
        {
          title: '车站2',
          key: '一号线-车站2'
        },
        {
          title: '车站3',
          key: '一号线-车站3'
        },
        {
          title: '车站4',
          key: '一号线-车站4'
        },
        {
          title: '车站5',
          key: '一号线-车站5'
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
          key: '二号线-车站1'
        },
        {
          title: '车站2',
          key: '二号线-车站2'
        },
        {
          title: '车站3',
          key: '二号线-车站3'
        },
        {
          title: '车站4',
          key: '二号线-车站4'
        },
        {
          title: '车站5',
          key: '二号线-车站5'
        },
      ],
    },
  ];

export const treeDataLine: DataNode[] = [
    {
      title: '一号线',
      key: '一号线',
    },
    {
      title: '二号线',
      key: '二号线',
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
    address: string;
    repairtime: string;
    type:string;
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
      title: '设备所在区域',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: '2',
      width: 150,
    },
    {
      title: '平均维修时间',
      dataIndex: 'repairtime',
      key: '3',
      width: 150,
    },
    {
      title: '维修及时率',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: '返修率',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: '维修到位率',
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
      type:`类型 ${i + 1}`,
      name: `设备 ${i + 1}`,
      repairtime: `2022.12.${i + 1}`,
      address: `区域 ${i}`,
    });
  }


