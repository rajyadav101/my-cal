import React, { useEffect, useState } from "react";
import moment from "moment";

function Calendar(props) {
  const [date, setDate] = useState();

  useEffect(()=>{
      setDate(moment(props.date))
  }, [props.date])

  // Calculating month related things
  const firstDayOfMonth = moment(date).startOf("month").toString();
  const daysInMonth = moment(date).daysInMonth();

  const blanks = [];
  for (let i = 0; i < moment(firstDayOfMonth).day(); i++) {
    blanks.push(
      <td key={`${i}-empty`} className="day-cell empty">
        {""}
      </td>
    );
  }

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <td key={`${i}-fill`} className={i === parseInt(moment(date).format('DD')) ? "day-cell high-light": "day-cell"}>
        {i}
      </td>
    );
  }

  const totalSlots = [...blanks, ...days];
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <div className="calendar">
      <div>
      <div className="calendar-header">
        <h2>{moment(date).format("MMMM YYYY")}</h2>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Calendar;
