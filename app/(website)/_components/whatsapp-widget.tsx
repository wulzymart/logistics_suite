
'use client'
import "react-whatsapp-chat-widget/index.css";
import React from 'react';


// @ts-ignore
import Widget from  "react-whatsapp-chat-widget"

const WhatsAppWidget = () => {
    return (
        <Widget
            //ts-ignore
            phoneNo="2348167900003"
            position="right"
            widgetWidth="300px"
            widgetWidthMobile="260px"
            autoOpen={false}
            autoOpenTimer={5000}
            messageBox={true}
            messageBoxTxt="Hello First Line Logistics, I have an enquiry"
            iconSize="40"
            iconColor="white"
            iconBgColor="black"
            headerIcon="/logo1.png"
            headerIconColor="pink"
            headerTxtColor="black"
            headerBgColor="gray"
            headerTitle="Chat with us"
            headerCaption="Online"
            bodyBgColor="#bbb"
            chatPersonName="Support"
            chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
            footerBgColor="#999"
            placeholder="Type a message.."
            btnBgColor="lightgray"
            btnTxt="Start Chat"
            btnTxtColor="black"
        />
    );
};

export default WhatsAppWidget;