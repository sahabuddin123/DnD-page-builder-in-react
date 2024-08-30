import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceTable = ({ onUpdate, onDelete, style }) => {
  const [events, setEvents] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [skillsInInvoice, setSkillsInInvoice] = useState([]);

  useEffect(() => {
    axios.get('/api/events.json')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the events!", error);
      });

    axios.get('/api/skills.json')
      .then(response => {
        setAllSkills(response.data.skills); // Assuming skills are in response.data.skills
        setSkillsInInvoice(response.data.skills_in_invoice); // Assuming skills in invoice are in response.data.skills_in_invoice
      })
      .catch(error => {
        console.error("There was an error fetching the skills!", error);
      });
  }, []);

  return (
    <div className="invoice-element" >
      <table className="table table-timesheet" style={style}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Event</th>
            <th>Address/Venue</th>
            <th>Crew</th>
            <th>Hours</th>
            <th>Extra Hours/£</th>
            {allSkills.map(skill => <th key={skill}>{skill}</th>)}
            <th>Extras</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.date}</td>
              <td>{event.start_time}</td>
              <td>{event.job_number}</td>
              <td>{event.location}</td>
              <td>{event.event_total_staff}</td>
              <td>{event.get_invoice_event_quotedhours}</td>
              <td>{event.get_invoice_event_extra_time}/{event.get_invoice_event_cost_for_extra_time}</td>
              {skillsInInvoice.map((skillDict, index) => {
                const skill = skillDict[event.id];
                return <td key={index}>{skill ? skill.total : 'No Skill'}</td>;
              })}
              <td>{event.invoice_event_calculate_extra_costs}</td>
              <td>{event.calculate_invoice_event_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
