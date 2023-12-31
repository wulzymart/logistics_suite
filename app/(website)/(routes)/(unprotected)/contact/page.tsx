import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import Header1 from "@/components/Header1";
const Contact = () => {
  return (
    <main>
      <div>
        <Header1 title="Contact us" />
        <div className="container text-center my-10 mx-auto">
          <h3 className="font-semibold text-2xl mb-5 font-body">Head Office</h3>
          <p className="mb-5">
            Location: KM 56 Agasa junction opposite DR. Ado Ibrahim Building
            Agasa junction Okene Kogi State
          </p>
          <div className="mb-2 text-sm">
            <p className="text-primary mb-1 font-medium">Main lines: </p>
            <WhatsAppIcon />
            <a
              className="mr-5"
              href="tel:(+234)8167900003
"
            >
              (+234)8167900003
            </a>
            <PhoneIcon />{" "}
            <a
              className="mr-0"
              href="tel:(+234)8133434400

"
            >
              (+234)8133434400
            </a>
          </div>
          <p className="mb-5 font-medium">
            Email:{" "}
            <a
              className="mr-0"
              href="mailto:customerservice@firstlinelogistics.ng"
            >
              customerservice@firstlinelogistics.ng
            </a>
          </p>
        </div>
        {/* {statesWithStations.map((state, index) => (
          <div
            key={index}
            className="container p-5 flex flex-wrap rounded md:p-10 bg-white mb-10 mx-auto"
          >
            <div className="w-full md:w-1/4">
              <h3 className="font-semibold text-2xl mb-10">{state.state}</h3>
            </div>
            <div className="w-full flex flex-wrap md:w-3/4">
              {Object.keys(state.stations).map(
                (station, index) =>
                  station !== "Head Office" && (
                    <div key={index} className="w-full md:w-1/2 px-2">
                      <p className="font-medium text-primary text-lg mb-3">
                        {state.stations[station].name}
                      </p>
                      <p className="text-sm mb-10">
                        {state.stations[station].address.streetAddress}
                        <br />
                        <br />
                        <a
                          className="mr-2"
                          href={`tel:${state.stations[station].phoneNumber1}`}
                        >
                          {state.stations[station].phoneNumber1}
                        </a>
                        <a href={`tel:${state.stations[station].phoneNumber2}`}>
                          {state.stations[station].phoneNumber2}
                        </a>
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        ))} */}
      </div>
    </main>
  );
};

export default Contact;
