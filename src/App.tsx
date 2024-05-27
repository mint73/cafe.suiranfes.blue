// External Library
import { useState } from 'react';

// Internal Component
import './style.css';
import CSVTableComponent2, { CSVDownloadButton1 } from './csvDownload';
import { productData } from './data';
import { CreateCal } from './showCal';

// Material UI
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Button from '@mui/material/Button';

// Icons
import CalculateIcon from '@mui/icons-material/Calculate';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import DataFromFirebase from './dataFromFirebase';
import { PreserveDataComponent } from './dataToFirebase';

interface Item {
  time: string;
  quantity: string;
}
interface SellItem {
  item: string;
  quantity: number;
}

//買われた総数を表示する表のコンポーネント
const ItemTable: React.FC<{ items: SellItem[] }> = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          {items.map((_item, index) => (
            <th key={index}>{_item.item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {items.map((_item, index) => (
            <td key={index}>{_item.quantity}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

function App() {
  // interface DataObject {
  //   [key: string]: any;
  // }

  let timeArray: string[] = ["9:00", "10:00", "11:00"]; // 時間の配列
  let quantityArray: string[] = ["3", "5", "2"]; // 品物の個数の配列
  let items: Item[] = timeArray.map((time, index) => ({ time, quantity: quantityArray[index] }));

  const in_order_to_set_array: SellItem[] = productData.map((data) => {
    const one_of_productData = {
      item: data.product,
      quantity: 0
    }
    return one_of_productData;
  });;
  const [_SellItem, setSellIetm] = useState<SellItem[]>(in_order_to_set_array);

  const [data, setData] = useState<Item[]>(items);
  const DataTable: React.FC<{ items: Item[] }> = ({ items }) => {
    //console.log(items);
    const handleDelete = (index: number, time: string) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);

      const getKey = Object.keys(localStorage);
      for (let i = 0; i < getKey.length; i++) {
        if (getKey[i].indexOf(time) >= 0) {
          localStorage.removeItem(getKey[i]);
        }
      }
    };

    return (
      <table>
        <thead>
          <tr>
            <th>時間</th>
            <th>品物の個数</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.quantity}</td>
              <td>
                <Button onClick={() => { handleDelete(index, item.time); updateData(); }}>削除</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const updateData = () => {
    timeArray = [];
    quantityArray = [];
    let keySplitArray: string[][] = []
    for (let i = 0; i < localStorage.length; i++) {
      keySplitArray.push(Object.keys(localStorage)[i].split(')'));
    }
    keySplitArray.sort(function (a, b) { return (Number(a[0]) - Number(b[0])); });
    for (let i = 0; i < localStorage.length; i++) {
      timeArray.unshift(keySplitArray[i][1]);
    }
    console.log(timeArray);
    for (let i = 0; i < localStorage.length; i++) {
      quantityArray.unshift(localStorage.getItem(keySplitArray[i][0] + ")" + keySplitArray[i][1]));
    }
    items = timeArray.map((time, index) => ({ time, quantity: quantityArray[index] }));
    setData(timeArray.map((time, index) => ({ time, quantity: quantityArray[index] })));

    setSellIetm(in_order_to_set_array);
    let sophisticatedQuantityArray: string[][] = [];
    let newSophisticatedQuantityArray: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      quantityArray[i] = quantityArray[i].replace(/[[\]""]/g, '');
      sophisticatedQuantityArray[i] = quantityArray[i].split(",");
    }
    newSophisticatedQuantityArray = sophisticatedQuantityArray.flat();
    console.log(newSophisticatedQuantityArray);
    for (let i = 0; i < _SellItem.length; i++) {
      _SellItem[i].quantity = 0;
    }
    // console.log(productData[0].product);
    // console.log(in_order_to_set_array);

    for (let i = 0; i < newSophisticatedQuantityArray.length; i++) {
      for (let k = 0; k < productData.length; k++) {
        if (newSophisticatedQuantityArray[i] === productData[k].product) { _SellItem[k].quantity += Number(newSophisticatedQuantityArray[i + 1]) }
      }
    }
    console.log(_SellItem);
    setSellIetm(_SellItem);
  }

  const [code, setCode] = useState('');

  // 合計金額
  let sum = 0;

  // 模擬店かどうか判別
  if (code.indexOf("焼きそば") === 0) {
    const allArray = code.split(";");// 品ごとに分割
    var nameArray: string[] = new Array(allArray.length - 1);
    var costArray: number[] = new Array(allArray.length - 1);
    var qtyArray: number[] = new Array(allArray.length - 1);
    var sumArray: number[] = new Array(allArray.length - 1);
    // それぞれの情報に分割
    for (let i = 0; i < allArray.length; i++) {
      let a = allArray[i].split(",");
      let name = a[0];
      let cost = Number(a[1]);
      let qty = Number(a[2]);
      let eachSum = Number(a[3]);
      nameArray[i] = name;
      costArray[i] = cost;
      qtyArray[i] = qty;
      sumArray[i] = eachSum;
    }

    // 合計金額を求める処理
    for (let i = 0; i < sumArray.length - 1; i++) {
      sum = sum + sumArray[i]
    }
    // console.log(sum);
  }


  // ページ処理
  
  const [isVisible3, setIsVisible3] = useState<boolean>(true);
  const [isVisible4, setIsVisible4] = useState<boolean>(false);

  const Page3 = () => {
    setIsVisible3(true);
    setIsVisible4(false);
    // stopScanning();
  }
  const Page4 = () => {
    setIsVisible3(false);
    setIsVisible4(true);
    updateData();
    // stopScanning();
  }

  return (
    <div className="App"
      style={{
        margin: "0 10% 68px 10%",
      }}>
      {/* Page3 */}
      {isVisible3 &&
        <div id="clalculator">
          <h2>電卓</h2>
          <CreateCal />
        </div>
      }

      {/* Page4 */}
      {isVisible4 &&
        <div id="data">
          <h2>データ</h2>
          <h3>全体のデータ</h3>
          <PreserveDataComponent data={_SellItem} data2={data} />
          <DataFromFirebase />
          <h3>あなたのデータ</h3>
          <CSVDownloadButton1 data={_SellItem} />
          <ItemTable items={_SellItem} />
          <p>---</p>
          <CSVTableComponent2 data={data} />
          <DataTable items={data} />
        </div>
      }

      {/* footer */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation>
          <BottomNavigationAction label="電卓" icon={<CalculateIcon />} onClick={Page3} />
          <BottomNavigationAction label="データ" icon={<DataThresholdingIcon />} onClick={Page4} />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default App;
