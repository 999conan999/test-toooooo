const Binance = require('node-binance-api');
const binance = new Binance().options({});
var RSI = require('technicalindicators').RSI;
const TelegramBot = require('node-telegram-bot-api');
const token = '2065445220:AAFQ7-661ZM4g0GvJ8TTsaDxgYgNl-bSIMQ';
const bot = new TelegramBot(token, {polling: true});
//t.me/News_signal_bot
var data_all=[];
////////////////////////////////
// down
// const time="1w"
const time="1d"
////////////////////////////////
main();
// data_set();
async function main(){
  let list_symbol=await get_symbol('USDT');
  get_data_socket(list_symbol);
}
// khoi tao socket lay data
//
async function get_data_socket(list_symbol){

  binance.websockets.chart(list_symbol, time, (symbol, interval, chart) => {
  // binance.websockets.chart("BTCUSDT", time, (symbol, interval, chart) => {

      let array_data=[]; let hight_price=[]; let low_price=[]; let current_price=null;
      Object.keys(chart).forEach(function(key) {
        array_data.push(chart[key].close);
        hight_price.push(chart[key].high);
        low_price.push(chart[key].low);
      })
      current_price=array_data[array_data.length-1]
      array_data.pop();
      hight_price.pop();
      low_price.pop();
      //

      let last_close_2=array_data[array_data.length-1];
      let last_close_1=array_data[array_data.length-2];
      data_all[symbol]={
        rsi_close_array:array_data,
        current_price:current_price,
        last_close_2:last_close_2,
        last_close_1:last_close_1,
        hight_price:hight_price,
        low_price:low_price
      };
      ///
  },300);

}
// hien thi thong tin list_coin_down or list_coin_up
// async function data_set(){
//   // setTimeout(async ()=>{
//   setInterval(async ()=>{
//     Object.keys(data_all).forEach(function(key) {
//       if((key.indexOf("DOWN")<0)&&key.indexOf("UPUSDT")<0){
//         let rsi_close_array=data_all[key].rsi_close_array;
//         let current_price=data_all[key].current_price; // gia hien tai
//         let last_close_2=data_all[key].last_close_2;// cay nen cuoi cung
//         let last_close_1=data_all[key].last_close_1;// cay nen gan cuoi
//         let hight_price=data_all[key].hight_price;// arr
//         let low_price=data_all[key].low_price;//arr
//         let rsi_5=RSI.calculate({values:rsi_close_array,period : 5});
//         let arr=[99,99,99,99,99]
//         rsi_5=arr.concat(rsi_5);
//         // console.log(rsi_5);
//         let count=0; let index_1=null; let index_2=null; let index_3=null;
//         for(let i=rsi_5.length-1;i>=0;i--){
//           if(count==0){ // tim RSI_5 < 23 dau tien
//             if(rsi_5[i]<=24){
//               index_1=i;
//               count++;
//             }
//           }else if(count==1){
//             if(rsi_5[i]>=50){
//               count++;
//             }
//           }else if(count==2){
//             if(rsi_5[i]<=24){
//               index_2=i;
//               count++;
//             }
//           }else if(count==3){
//             if(rsi_5[i]>=50){
//               index_3=i;
//               count++;
//               break;
//             }
//           }
//         }
//         if(count>=3){
//           // tim dinh nen
//           let highest_price=hight_price[index_2]; // dinh
//           let index_dinh=index_2;// vi tri index cua dinh
//           for(let j=index_2;j<=index_1;j++){
//             if(hight_price[j]>highest_price){
//               highest_price=hight_price[j];
//               index_dinh++;
//             }
//           }
//           // tim day nen thap nhat
//           let lowest_price=low_price[index_3];
//           if(count>=4){
//             for(let k=index_3;k<=index_dinh;k++){
//               if(low_price[k]<lowest_price){
//                 lowest_price=low_price[k];
//               }
//             }
//           }else{
//             lowest_price=low_price[index_2];
//           }
//           // tim day hoi cua nen
//           let low_sc_price=low_price[index_dinh];
//           for(let z=index_dinh;z<=low_price.length-1;z++){
//             if(low_price[z]<low_sc_price){
//               low_sc_price=low_price[z];
//             }
//           }
//           // console.log(highest_price)
//           // console.log(lowest_price)
//           // console.log(low_sc_price)
//           // console.log(current_price)
//           // // tim nen vuot dinh
//           if((last_close_2>highest_price&&last_close_1<highest_price)||(last_close_2<highest_price&&last_close_1>highest_price)){
//             console.log(key.replace("USDT", "_USDT"),' : ', 'https://www.binance.com/vi/trade/'+key.replace("USDT", "_USDT"))// hien thi cai symbol ra khi thoa dieu kien
//             let do_day_cua_song_cha=Math.round(((highest_price-lowest_price)/lowest_price)*100);
//             let cat_lo=Math.round(((lowest_price-highest_price)/highest_price)*100);
//             let do_day_cua_song_dieu_chinh=Math.round(((low_sc_price-highest_price)/highest_price)*100);
//             let do_day_cua_song_hoi=Math.round(((current_price-low_sc_price)/low_sc_price)*100);
//             console.log("___ ????? d??y c???a s??ng Cha: * ",do_day_cua_song_cha+"%");
//             console.log("___ C???t l??? s??? m???t: * ",cat_lo+"%")
//             console.log("  + Kh??ng c???: ",highest_price)
//             console.log("  + H??? tr???: ",lowest_price)
//             console.log("  + Gi?? hi???n t???i: ",current_price)
//             console.log("___ ????? d??y c???a s??ng ??i???u ch???nh : ",do_day_cua_song_dieu_chinh+"%")
//             console.log("___ ????? d??y c???a s??ng h???i : ",do_day_cua_song_hoi+"%")
//             console.log("----------------------------------------------------------------------")
//           }
//         }
//      }
//     })


//   },30000)
// }

// get_symbol('USDT');
// lay thong tin tat ca cac cap tien trade dua tren ten, dau vao la ten VD "USDT" ==> get_symbol('USDT')
async function get_symbol(basic_name){
  let rs=[];
  let prevDay= await binance.prevDay(false)
  for ( let obj of prevDay ) {
    let symbol = obj.symbol;
    if(symbol.indexOf(basic_name)>0){
      // if(obj.volume>10000000){
        rs.push(symbol)
      // }
    }
  }
  return rs;
}

// Bot telegram here
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let message=msg.text.toUpperCase();
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, `
  //   B???n ??ang nh???n c?? ph??p n??y ????ng kh??ng :
  //   ${message}
  // `);
  if(message=="LIST"){
    get_symbol_list_up(chatId);
  }else{
    get_a_symbol_infor(chatId,message)
  }
});

// send list symbol tiem nang
async function get_symbol_list_up(chatId){
    Object.keys(data_all).forEach(function(key) {
      if((key.indexOf("DOWN")<0)&&key.indexOf("UPUSDT")<0){
        let rsi_close_array=data_all[key].rsi_close_array;
        let current_price=data_all[key].current_price; // gia hien tai
        let last_close_2=data_all[key].last_close_2;// cay nen cuoi cung
        let last_close_1=data_all[key].last_close_1;// cay nen gan cuoi
        let hight_price=data_all[key].hight_price;// arr
        let low_price=data_all[key].low_price;//arr
        let rsi_5=RSI.calculate({values:rsi_close_array,period : 5});
        let arr=[99,99,99,99,99]
        rsi_5=arr.concat(rsi_5);
        // console.log(rsi_5);
        let count=0; let index_1=null; let index_2=null; let index_3=null;
        for(let i=rsi_5.length-1;i>=0;i--){
          if(count==0){ // tim RSI_5 < 23 dau tien
            if(rsi_5[i]<=24){
              index_1=i;
              count++;
            }
          }else if(count==1){
            if(rsi_5[i]>=50){
              count++;
            }
          }else if(count==2){
            if(rsi_5[i]<=24){
              index_2=i;
              count++;
            }
          }else if(count==3){
            if(rsi_5[i]>=50){
              index_3=i;
              count++;
              break;
            }
          }
        }
        if(count>=3){
          // tim dinh nen
          let highest_price=hight_price[index_2]; // dinh
          let index_dinh=index_2;// vi tri index cua dinh
          for(let j=index_2;j<=index_1;j++){
            if(hight_price[j]>highest_price){
              highest_price=hight_price[j];
              index_dinh++;
            }
          }
          // tim day nen thap nhat
          let lowest_price=low_price[index_3];
          if(count>=4){
            for(let k=index_3;k<=low_price.length-1;k++){
            // for(let k=index_3;k<=index_dinh;k++){
              if(low_price[k]<lowest_price){
                lowest_price=low_price[k];
              }
            }
          }else{
            lowest_price=low_price[index_2];
          }
          // tim day hoi cua nen
          let low_sc_price=low_price[index_dinh];
          for(let z=index_dinh;z<=low_price.length-1;z++){
            if(low_price[z]<low_sc_price){
              low_sc_price=low_price[z];
            }
          }
          // // tim nen vuot dinh
          if((last_close_2>highest_price&&last_close_1<highest_price)||(last_close_2<highest_price&&last_close_1>highest_price)){
            // console.log(key.replace("USDT", "_USDT"),' : ', 'https://www.binance.com/vi/trade/'+key.replace("USDT", "_USDT"))// hien thi cai symbol ra khi thoa dieu kien
            let do_day_cua_song_cha=Math.round(((highest_price-lowest_price)/lowest_price)*100);
            let cat_lo=Math.round(((lowest_price-highest_price)/highest_price)*100);
            let do_day_cua_song_dieu_chinh=Math.round(((low_sc_price-highest_price)/highest_price)*100);
            let do_day_cua_song_hoi=Math.round(((current_price-low_sc_price)/low_sc_price)*100);
            // chuan doan
            let chuan_doan="";
            if(cat_lo==do_day_cua_song_dieu_chinh){
              chuan_doan=`D??? ??o??n xu h?????ng NH??? hi???n t???i n???m trong xu h?????ng GI???M, n???u ph?? v??? kh??ng c??? ${highest_price}, c?? th??? t??ng.`;
            }else{
              chuan_doan=`D??? ??o??n xu h?????ng NH??? hi???n t???i n???m trong xu h?????ng T??NG, n???u ph?? v??? kh??ng c??? ${highest_price}, c?? th??? t??ng ti???p.`;
            }
            bot.sendMessage(chatId, `
              ${key.replace("USDT", "_USDT")} :
* Kh??ng c???: ${highest_price};
* H??? tr???: ${lowest_price};
* Gi?? hi???n t???i: ${current_price};
___????? d??y c???a s??ng Cha: * ${do_day_cua_song_cha}% ;
___ C???t l??? s??? m???t: * ${cat_lo}% ;
___ ????? d??y c???a s??ng ??i???u ch???nh : ${do_day_cua_song_dieu_chinh}%;
___ ????? d??y c???a s??ng h???i : ${do_day_cua_song_hoi}%;
=>* K???t lu???n: ${chuan_doan};
            `);
          }
        }
     }
    })

}
// infor a symbol
async function get_a_symbol_infor(chatId,message){
  symbol = message+'USDT';
  let data=data_all[symbol];
  if(data!=undefined){
    //
    // console.log(data_all[symbol]);
    let rsi_close_array=data_all[symbol].rsi_close_array;
    let current_price=data_all[symbol].current_price; // gia hien tai
    let last_close_2=data_all[symbol].last_close_2;// cay nen cuoi cung
    let last_close_1=data_all[symbol].last_close_1;// cay nen gan cuoi
    let hight_price=data_all[symbol].hight_price;// arr
    let low_price=data_all[symbol].low_price;//arr
    let rsi_5=RSI.calculate({values:rsi_close_array,period : 5});
    let arr=[99,99,99,99,99]
    rsi_5=arr.concat(rsi_5);
    // console.log(rsi_5);
    let count=0; let index_1=null; let index_2=null; let index_3=null;
    for(let i=rsi_5.length-1;i>=0;i--){
      if(count==0){ // tim RSI_5 < 23 dau tien
        if(rsi_5[i]<=24){
          index_1=i;
          count++;
        }
      }else if(count==1){
        if(rsi_5[i]>=50){
          count++;
        }
      }else if(count==2){
        if(rsi_5[i]<=24){
          index_2=i;
          count++;
        }
      }else if(count==3){
        if(rsi_5[i]>=50){
          index_3=i;
          count++;
          break;
        }
      }
    }
    if(count>=3){
      // tim dinh nen
      let highest_price=hight_price[index_2]; // dinh
      let index_dinh=index_2;// vi tri index cua dinh
      for(let j=index_2;j<=index_1;j++){
        if(hight_price[j]>highest_price){
          highest_price=hight_price[j];
          index_dinh++;
        }
      }
      // tim day nen thap nhat
      let lowest_price=low_price[index_3];
      let low_sideway=low_price[index_3];
      if(count>=4){
        for(let k=index_3;k<=low_price.length-1;k++){
          if(low_price[k]<lowest_price){
            lowest_price=low_price[k];
          }
        }
        //
          for(let k=index_3;k<=index_dinh;k++){
            if(low_price[k]<low_sideway){
              low_sideway=low_price[k];
            }
          }
      }else{
        lowest_price=low_price[index_2];
      }
      // tinh trung binh gia close tu index2

      // tim day hoi cua nen
      let low_sc_price=low_price[index_dinh];
      for(let z=index_dinh;z<=low_price.length-1;z++){
        if(low_price[z]<low_sc_price){
          low_sc_price=low_price[z];
        }
      }
          // // tim nen vuot dinh
            let do_day_cua_song_cha=Math.round(((highest_price-lowest_price)/lowest_price)*100);
            let cat_lo=Math.round(((lowest_price-highest_price)/highest_price)*100);
            let do_day_cua_song_dieu_chinh=Math.round(((low_sc_price-highest_price)/highest_price)*100);
            let do_day_cua_song_hoi=Math.round(((current_price-low_sc_price)/low_sc_price)*100);
            let cach_day=Math.round(((current_price-lowest_price)/lowest_price)*100);
            let cach_dinh=Math.round(((current_price-highest_price)/highest_price)*100);
            // chuan doan
            let chuan_doan="";
            if(cat_lo==do_day_cua_song_dieu_chinh){
              chuan_doan=`D??? ??o??n xu h?????ng NH??? hi???n t???i n???m trong xu h?????ng GI???M, n???u ph?? v??? kh??ng c??? ${highest_price}, c?? th??? t??ng.`;
            }else{
              chuan_doan=`D??? ??o??n xu h?????ng NH??? hi???n t???i n???m trong xu h?????ng T??NG, n???u ph?? v??? kh??ng c??? ${highest_price}, c?? th??? t??ng ti???p.`;
            }
            // xet xem gia last_close_2 nam trong khoang tu dinh den low_sideway thi no dang sideway; cao hon hinh la dang tang; duoi low_sideway la dang giam
            // hien tai dang nhu nao
            let hien_tai='Ch??a x??c ?????nh !';
            if(last_close_2>=highest_price){
              hien_tai="???? v?????t ?????nh, v?? ??ang t??ng!";
            }else if(last_close_2<highest_price&&last_close_2>=low_sideway){
              hien_tai=`??ang sideWay t??? v??ng ${low_sideway} ?????n ${highest_price};`
            }else if(last_close_2<low_sideway){
              hien_tai=`??ang trong xu h?????ng gi???m; ???? ph?? v??? h??? tr??? ${low_sideway};`;
            }
            bot.sendMessage(chatId, `
              ${symbol} :
* Kh??ng c???: ${highest_price};
* H??? tr???: ${lowest_price};
* Gi?? hi???n t???i: ${current_price};
___????? d??y c???a s??ng Cha: * ${do_day_cua_song_cha}% ;
___ C???t l??? s??? m???t: * ${cat_lo}% ;
___ ????? d??y c???a s??ng ??i???u ch???nh : ${do_day_cua_song_dieu_chinh}%;
___ ????? d??y c???a s??ng h???i : ${do_day_cua_song_hoi}%;
=>* K???t lu???n: ${chuan_doan};
=> T??nh h??nh hi???n t???i : ${hien_tai}
___ GI?? hi???n t???i c??ch ????y : ${cach_day}%
___ GI?? hi???n t???i c??ch ?????nh : ${cach_dinh}%

            `);
    }else{
      bot.sendMessage(chatId,'['+message+'], Ch??a ????? d??? li???u ????? t??nh to??n th??ng tin!')
    }
 
    }else{
    bot.sendMessage(chatId,'['+message+'], Kh??ng t??m th???y th??ng tin!')
  }
}