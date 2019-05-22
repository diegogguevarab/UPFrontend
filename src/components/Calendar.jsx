import React, { Component } from 'react';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import EventModal from './EventModal';
import { events } from "../actions";


class Calendar extends Component {

  componentDidMount() {
    this.props.fetchEvents();
  }

  calendarComponentRef = React.createRef()
  state = {
    updateEventId: null,
    isModalOpen: false,
    eventModal: false,
    start: new Date()
  }

  render() {
    return (
      <div className='app'>
        <div className='content'>
          <FullCalendar
            defaultView="timeGridWeek"
            themeSystem="bootstrap"
            locale={esLocale}
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin]}
            ref={this.calendarComponentRef}
            events={this.props.events}
            dateClick={this.handleDateClick}
            eventClick={this.toggleEventModal}
            nowIndicator={true}
          />
          <EventModal
            show={this.state.isModalOpen}
            onClose={this.toggleModal}
            changeStart={this.toggleStart}
            start={this.state.start}
          />
        </div>
      </div>
    );
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  toggleStart = (date) => {
    this.setState({
      start: date
    })
  }

  handleDateClick = (arg) => {
    this.toggleStart(arg.date)
    this.toggleModal()
  }

}
const mapStateToProps = state => {
  return {
    events: state.events,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => {
      dispatch(events.fetchEvents());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
