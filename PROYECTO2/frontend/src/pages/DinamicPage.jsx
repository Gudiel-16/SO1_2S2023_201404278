import { useEffect, useState } from 'react';
import socket from '../socket/Socket';

const DinamicPage = () => {

  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {

    function onFooEvent(value) {
      console.log(value);
      setFooEvents(value);
    }

    socket.on("datadinamic", onFooEvent);

    return () => {
      socket.off('datadinamic', onFooEvent);
    }
  }, [fooEvents]);

  return (
    <div>DinamicPage</div>
  )
}

export default DinamicPage