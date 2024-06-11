import { NavbarInfo } from 'components/NavbarInfo'
import styles from './info.module.scss'
import table1 from 'assets/table1.png'
import imageR2 from 'assets/imageR2.png'
import tableR2 from 'assets/tableR2.png'
import table3 from 'assets/table3.png'
import image3 from 'assets/image3.png'
import table4 from 'assets/table4.png'
import image4 from 'assets/imageR4.png'

const Info = () => {
  return (
    <>
      <NavbarInfo/>
      <div className={styles.main}>
        <div className={styles.info}>
          <h1>Abstract</h1>
          <p>
            In the context of enhancing agricultural efficiency, this project presents a soil moisture monitoring
            system that leverages a long-range network, low-power consumption, and a cloud-based platform for
            data storage. The system uses the Modbus protocol for reliable communication, LoRa for long-range
            data transmission, and integrates with The Things Network[5] for seamless data flow. The node,
            powered by solar energy, collects moisture data from multiple sensors and transmits it to a gateway.
            A webhook in The Things Network triggers events to store relevant data in a cloud server, deployed
            using Django and Django Rest Framework on PythonAnywhere[1]. The client application, developed
            with React, TypeScript, and Sass, and deployed on Vercel[4], provides a user-friendly interface for
            monitoring and controlling soil moisture. The final prototype demonstrates significant advancements
            in software development, database deployment, and web application development.
            <br/><br/>Keywords: LoRa, The Things Network, soil moisture, IoT, Cloud, Modbus, agricultural system,
            irrigation control, Web application.
          </p>
        </div>

        <div className={styles.info}>
          <h1>Introduction</h1>
          <p>
            In a context where agriculture stands as a vital economic sector crucial for ensuring food security, it
            becomes evident that there is a pressing need for enhanced efficiency in resource utilization, particu-
            larly concerning water management. To address this challenge, our project introduces a sophisticated
            soil moisture monitoring system characterized by its long-range network capability, low-power con-
            sumption, and integration with a cloud platform for data storage.
            <br/><br/>This system facilitates remote monitoring through any smart device, enabling users to access real-
            time data on soil conditions and exercise control over irrigation systems across diverse landscapes.
            Our prototype presents a cloud-based, low-power, long-range network designed specifically for soil
            moisture monitoring in agricultural settings. The architectural framework of our project revolves
            around modular nodes equipped with scalable soil moisture sensors that communicate via Modbus
            protocol and operate autonomously in terms of energy consumption.
            <br/><br/>Additionally, an optional gateway consolidates data from multiple nodes and channels it to a
            cloud-based platform. Gateway can be configured either as a public resource open to other clients or
            as a private service. Through this platform, clients gain access to comprehensive tools for interacting
            with, visualizing, and analyzing soil moisture data to optimize crop efficiency.
            <br/><br/>The subsequent sections of this document outline the objectives, key goals, and requirements of
            our final prototype. We provide a detailed account of both the hardware setup, including components
            and wiring layouts, and the software implementation, encompassing protocols, embedded code, and
            LoRa communication utilized in our node. Furthermore, we elucidate the integration process be-
            tween the node, The Things Network, and our servers, offering insights into the client application’s
            functionality and capabilities.
          </p>
        </div>

        <div className={styles.info}>
          <h1>Project Definition</h1>
          <p>
            The aim of this project is to establish a robust wireless platform capable of remotely monitoring
            soil moisture with a range of at least 5 kilometers. Central to its design is the provision of real-
            time data to a cloud-based database, accessible through a user-friendly interface for visualization and
            control. Furthermore, the system must facilitate the management of water valves to optimize irrigation
            processes.
            <br/><br/>Incorporating energy storage capabilities alongside reliance on solar panels for recharging is a key
            feature. To ensure prolonged operational capability, low-power considerations are paramount, with
            the goal of sustaining functionality for over 3 days without requiring recharging.
            <br/><br/>The architecture includes sensing nodes capable of connecting multiple wired moisture sensors
            through a Modbus connection. Future scalability is ensured through a plug-and-play feature, allowing
            for seamless sensor expansion with minimal software adjustments.
            <br/><br/>Ultimately, the system’s design seeks to balance cost-effectiveness with reliability, ensuring a
            sustainable solution for agricultural monitoring and management.
            <br/><br/>Within the project’s scope, the engineering team embraced a product-oriented mindset, prioritiz-
            ing functionality, scalability, and user experience as outlined in Table 1.
          </p>
        </div>

        <div className={styles.info}>
          <h1>System Architecture Design and Implementation</h1>
          <p>
            In this section, we will explore the technical details of the development prototype and explain how
            the integrations work between the layers of our architecture.
          </p>

          <div className={styles.image}><img src={table1}/></div>

          <h2>Architecture Design Overview</h2>
          <p>
            First, we shall gain a better understanding of the system by examining its high-level functionality and
            the flow of data back and forth. Figure 1 illustrates the communication paths and technologies used,
            enabling our end users to monitor and control the moisture system at home with just internet access.
          </p>

          <div className={styles.image}><img src={imageR2}/></div>

          <p>
            Our node collects moisture data from up to 16 sensors using an established Modbus protocol (the
            implemented Modbus protocol will be described in Section 3.2.3). It then uses LoRa to communicate
            with a gateway. This gateway can be private, purchased, and installed by the client, or it can be a
            public gateway registered on The Things Network. Clients gateways can also be made accessible to
            others if desired. The data is then send to The Things Network servers.
            <br/><br/>A webhook is configured in our The Things Network application. When data reaches it, triggers
            an event that is listened to by our servers to store any relevant data from our client node. Our server is
            deployed using PythonAnywhere and is written using Django with Django Rest Framework, allowing
            it to serve as an API for our client application.
            <br/><br/>For our client application, the stack used in development was React framework with Typescript and Sass, deploying it on Vercel. This application serves as the interface that will allow the end user
            to centralize all monitoring and control of it soil moisture<br/><br/>
          </p>

          <h2>Node Implementation</h2>
          <p>
            Following the general overview on functionality of the system, this section will cover in more specific
            details the Node implementation as components used, describing wiring schematics, explaining the
            software used in both micro-controllers and explain the behaviour of the modbus protocol used.
          </p>

          <p>
            Table 2 lists the required components necessary to implement the Node prototype. Please note that
            the quantity of each component may vary based on the number of sensors included in the system.
          </p>

          <div className={styles.image}><img src={tableR2}/></div>

          <p>
            In this section, we will look into the technical details necessary to establish the connection of the
            Wio-E5 mini board with the MAX485 modules and Attiny85[3] devices serving as client devices. We
            will provide a detailed overview of the wiring implemented, including the connections between the
            components and the configuration settings required for communication. By the end of this section,
            readers will have a comprehensive understanding of the wiring setup and its implementation within
            the soil monitoring system.
          </p>

          <div className={styles.image}><img src={table3}/></div>
          <div className={styles.image}><img src={image3}/></div>
          <div className={styles.image}><img src={table4}/></div>

          <p>
            As we opted for a Modbus architecture, a protocol had to be designed to prevent signal collisions and
            losses in our communication line. The half-duplex feature of the MAX485 was greatly appreciated
            for this purpose. The MAX485 module has the designated pins DE and RE that dictate the direction
            of signal transmission. This allows us to control when our microcontroller has access to write into the
            communication line.
            <br/><br/>With an assigned ID in each of the Attiny, the head microcontroller (Wio-E5 mini) is able to direct
            communication and thus access the communication line. Therefore, all Attinys stay in a listening state
            until they receive a message containing their ID. At this point, they wake up, read the analog value
            given by the moisture sensor, reply back with the value, and then return to the default sleep/read state.
            Figure 3 contains a visual representation in the form of a Finite State Machine of this implementation
            (Wio-E5 states are simplified and do not contain LoRa-related states, which are further described in
            Section 3.2.4).
          </p>

          <div className={styles.image}><img src={image4}/></div>

          <p>
            <b>Wio-E5 mini</b>
            <br/><br/>The main MCU of the node,Wio-E5, is tasked with two primary responsibilities: managing modbus
            communications with multiple Attiny85 devices and transmitting all gathered data to The Things
            Network. To achieve this, we implemented FreeRTOS and utilized its Threads functionality to
            create two distinct threads, each dedicated to a specific task.
            <br/><br/>As detailed in Section 3.2.3, the implemented protocol relies on the Wio-E5 to send messages
            containing the ID of the client device with which it intends to communicate. To accomplish this,
            a dedicated task runs in a loop, sequentially sending all possible IDs (ranging from 1 to 16, the
            maximum capacity of our prototype), and then waits for a response, while changing MAX485 pins
            that enable read or write operations. If the wait times out (set to half a second), our node marks
            the information with the value 0xFFFF, which is recognized as an offline sensor according to our
            application configuration in The Things Network.
            <br/><br/>The other thread is responsible for establishing and maintaining a connection with a gateway. It
            handles tasks such as performing pings, transmitting uplinks (data from the sensors), and receiving
            downlinks (commands for controlling the irrigation system).<br/><br/>
          </p>

          <p>
            <b>Attiny85</b>
            <br/><br/>The Attiny85 has a simple function and consequently, a simple software implementation. Programmed
            with the Arduino[2] IDE using a Board manager called ATtinyCore[6], it uses the built-in
            software serial implementation of the core to communicate with theWio-E5. The code structure of
            the Attiny is based on the following steps:
            <br/><br/>1. Setup Input and Output pins.
            <br/><br/>2. Setup Software Serial and pins.
            <br/><br/>3. Wait for a message containing its ID.
            <br/><br/>4. Read from analog sensor.
            <br/><br/>5. Change half-duplex pins of MAX485 to enable writing.
            <br/><br/>6. Send data and return to MAX485 to only read.<br/><br/>
          </p>

          <h2>Web application development</h2>

          <p>
          In this section we will briefly describe the we application development process by starting with the
          client side of our application, listing the technologies used in the project and how the user can interact
          with it. After that, we will dive into the server side, or the database, part in which we will explain the
          database structure and its access points. And finally, we end this section by explaining the usage of
          webhooks in order to integrate our TTN application with the database server.<br/><br/>
          </p>

          <p>
            <b>Client side</b>
            <br/><br/>When talking about client side interface development, which focuses on the user experience on the
            application, we used technologies as TypeScript, HTML and SCSS combined in a single framework
            called React and deployed in a cloud based server called Vercel App, resulting in a website that can
            be accessed in the link https://soilsense.vercel.app, that will be briefly described below.<br/><br/>
          </p>

          <p>
            <b>Server side</b>
            <br/><br/>When it comes to the server, or database, part, we started by verifying which kind of data we would
            collect from the node’s sensors and, based on that, drawing an ER diagram in order to guide us in the
            database creation. After the ER diagram drawing step, we followed to implement the database tables
            and querys. For this step of the task, after a long research, we decided to use a Python framework,
            called Django, that allow us to create and relate tables in a easier way, and also simplifies the creation
            process of the API for our database. The creation of and API was necessary so the hardware could
            communicate to the database using HTTP requests.
            <br/><br/>With all the database tables and querys being created and tested locally, we proceeded to deploy
            our database in a cloud based server. After some research, we decided to proceed our backend deploy
            in the PythonAnywhere platform, since it allow us to free deploy one project without query limits
            per hour. Currently, the database management system has been successfully implemented, being
            accessible in https://soilsense.pythonanywhere.com/.<br/><br/>
          </p>

          <p>
            <b>Webhook Integration</b>
            <br/><br/>When it comes to the server, or database, part, we started by verifying which kind of data we would
            collect from the node’s sensors and, based on that, drawing an ER diagram in order to guide us in the
            database creation. After the ER diagram drawing step, we followed to implement the database tables
            and querys. For this step of the task, after a long research, we decided to use a Python framework,
            called Django, that allow us to create and relate tables in a easier way, and also simplifies the creation
            process of the API for our database. The creation of and API was necessary so the hardware could
            communicate to the database using HTTP requests.
            <br/><br/>With all the database tables and querys being created and tested locally, we proceeded to deploy
            our database in a cloud based server. After some research, we decided to proceed our backend deploy
            in the PythonAnywhere platform, since it allow us to free deploy one project without query limits
            per hour. Currently, the database management system has been successfully implemented, being
            accessible in https://soilsense.pythonanywhere.com/.
          </p>
        </div>

        <div className={styles.info}>
          <h1>Conclusion</h1>
          <p>
            In conclusion, despite facing delays in hardware shipment,the presented prototype represents a significant
            advancement in agricultural technology, offering an easy and power-efficient solution. By using
            LoRa long-range communication, The Things Network infrastructure, with low-power consumption
            microcontrollers, and cloud-based data storage, the system provides remote access to real-time soil
            moisture data and enables precise control over irrigation processes. The system’s architecture, outlined
            in detail, demonstrates a well-implemented design that balances functionality, scalability, and
            cost-effectiveness. The integration of modular nodes with scalable sensors, powered by solar energy,
            ensures flexibility and sustainability in various agricultural settings. Additionally, the utilization of the
            Modbus protocol for reliable communication underscores the system’s robustness and efficiency. The
            software implementation, encompassing both the node firmware and the client device, exhibits a high
            level of technical sophistication. The use of FreeRTOS for multitasking on the Wio-E5 mini enables
            efficient management of Modbus communications and data transmission to the gateways. Similarly,
            the Attiny85 microcontrollers, programmed to communicate with theWio-E5 and collect sensor data,
            demonstrate simplicity and effectiveness in their design. On the client side, the web application developed
            with React, TypeScript, and Sass offers a user-friendly interface for monitoring soil moisture
            levels and controlling irrigation systems. The integration with a cloud-based database and The Things
            Network integrations with a webhook mechanism ensures seamless data flow and real-time updates
            for end-users. Overall, the presented soil moisture monitoring system showcases significant advancements
            in hardware and software development, offering a valuable tool for optimizing agricultural
            processes and promoting sustainable resource management.
          </p>
        </div>
        
        <div className={styles.videoResponsive}>
        <iframe width="100%" height="751" src="https://www.youtube.com/embed/8STtpsshhAk" title="SOILSENSE - PROJECT PRESENTATION" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  )
}

export default Info