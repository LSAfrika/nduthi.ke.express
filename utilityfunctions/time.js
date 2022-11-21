exports.Timestamp = () => {
  const timestamp = new Date();

  const date =
    timestamp.getFullYear() +
    "" +
    mapmonth() +
    mapdate() +
    "" +
    maphour() +
    "" +
    mapminutes() +
    "" +
    mapseconds();

  return date;
};

const maphour = () => {
  const timestamp = new Date();
  let Returnedhour = "";
  const hour = timestamp.getHours();
  if (hour < 10) {
    Returnedhour = "0" + hour;
    //     console.log('hour:',Returnedhour);
    return Returnedhour;
  } else {
    Returnedhour = "" + hour;
    //    console.log(Returnedhour);
    return Returnedhour;
  }
};
const mapdate = () => {
  const timestamp = new Date();
  let day = "";
  const date = timestamp.getDate();
  if (date < 10) {
    day = "0" + date;
    //     console.log('date:',date);
    return day;
  } else {
    day = "" + date;
    //      console.log(day);
    return day;
  }
};
const mapmonth = () => {
  const timestamp = new Date();
  let returnedmonth = "";
  const month = timestamp.getMonth() + 1;
  if (month < 10) {
    returnedmonth = "0" + month;
    console.log("months less than 9", month);
    return returnedmonth;
  } else {
    returnedmonth = "" + month;
    console.log("months greater than 9", returnedmonth);
    return returnedmonth;
  }
};

const mapminutes = () => {
  const timestamp = new Date();
  let returnedminutes = "";
  const minutes = timestamp.getMinutes();
  if (minutes < 10) {
    returnedminutes = "0" + minutes;
    //  console.log('month:',month);
    return returnedminutes;
  } else {
    returnedminutes = "" + minutes;
    //  console.log(returnedminutes);
    return returnedminutes;
  }
};
const mapseconds = () => {
  const timestamp = new Date();
  let returnedseconds = "";
  const seconds = timestamp.getSeconds();
  if (seconds < 10) {
    returnedseconds = "0" + seconds;
    //  console.log('month:',month);
    return returnedseconds;
  } else {
    returnedseconds = "" + seconds;
    //  console.log(returnedseconds);
    return returnedseconds;
  }
};
