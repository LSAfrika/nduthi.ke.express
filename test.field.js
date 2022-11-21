function mapmonth() {
  const timestamp = new Date();
  let returnedmonth = "";
  const month = timestamp.getMonth() + 1;
  if (month < 10) {
    returnedmonth = "0" + month;
    console.log("months less than 9", returnedmonth);
    return returnedmonth;
  } else {
    returnedmonth = "" + month;
    console.log("months greater than 9", returnedmonth);
    return returnedmonth;
  }
}

mapmonth();
