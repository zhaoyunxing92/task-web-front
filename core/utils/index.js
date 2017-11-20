/**
 * @author :  sunny
 * @date : 2017.11.20 09:50
 * @description :
 */
// 判断参数是否是其中之一
export  function oneOf (value, validList) {
  console.log(validList)
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
