import { Maximize, PanelRightClose, PanelRightOpen, Search, SquarePen } from "lucide-react";
import "./index.css";
import {
  AdvancedRealTimeChart,
  CryptoCoinsHeatmap,
  CryptoCurrencyMarket,
  ForexCrossRates,
  StockHeatmap,
  SymbolInfo,
  TickerTape,
  Timeline,
} from "react-ts-tradingview-widgets";
import { useLayoutEffect, useRef, useState } from "react";
import Chatbot from "../components/Chatbot";
import CustomTickerTape from "../components/CustomTickerTape";
import CustomNavbar from "../components/Navbar";

function Chat({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {
  const [extraWidgets, setExtraWidgets] = useState([]);
  const widgetsEndRef = useRef(null);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [horizontalSplit, setHorizontalSplit] = useState([60, 40])

  const scrollToBottom = () => {
    widgetsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 2000);
  }, [extraWidgets]);

  // Components map with default props
  const componentsMap = {
    SymbolInfo: {
      component: SymbolInfo,
      defaultProps: { colorTheme: "light", autosize: true },
    },
    AdvancedRealTimeChart: {
      component: AdvancedRealTimeChart,
      defaultProps: { theme: "light", height: 250, width: "100%" },
    },
    CryptoCurrencyMarket: {
      component: CryptoCurrencyMarket,
      defaultProps: { colorTheme: "light", height: 250, width: "100%" },
    },
    TickerTape: {
      component: CustomTickerTape,
    },
    Timeline: {
      component: Timeline,
      defaultProps: { theme: "light", height: 250, width: "100%" },
    },
    StockHeatmap: {
      component: StockHeatmap,
      defaultProps: { colorTheme: "light", height: 250, width: "100%" },
    },
    ForexCrossRates: {
      component: ForexCrossRates,
      defaultProps: { colorTheme: "light", height: 250, width: "100%" },
    },
    CryptoCoinsHeatmap: {
      component: CryptoCoinsHeatmap,
      defaultProps: { colorTheme: "light", height: 250, width: "100%" },
    }
  };

  return (
    <div className="dark h-[100dvh] w-full bgcustom">
      <div className="h-full w-full flex flex-col overflow-hidden">
        <div className="h-[55px] w-full overflow-hidden flex items-center">
          <CustomNavbar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="w-full h-[calc(100dvh-55px)] overflow-auto flex flex-col md:flex-row">
          <div className={`flex flex-col w-full md:w-[${horizontalSplit[0]}%] overflow-hidden h-[calc((100dvh-55px)/0.55)] md:h-[calc(100dvh-55px)]`}>
            <div className="h-full flex flex-col overflow-y-auto p-5  border-[gray] border-b md:border-r-0 md:border-b-0">
              <div className="h-full w-full">

                {extraWidgets.length !== 0 &&
                  <div className=" p-3">
                    {extraWidgets.map(({ graph_type, symbol }, index) => {
                      const widgetData = componentsMap[graph_type]; // Get widget based on graph_type
                      if (!widgetData) return null;

                      const { component: WidgetComponent, defaultProps } = widgetData;
                      return (
                        <div key={index} className="relative h-fit border justify-center max-h-[280px] rounded-xl my-2 scrollbar-hide overflow-hidden">
                          <button
                            onClick={() => setSelectedWidget({ type: graph_type, symbol })}
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-lg shadow-md z-10"
                            title="Fullscreen"
                          >
                            <Maximize className="h-6 w-6" />
                          </button>
                          <WidgetComponent {...defaultProps} symbol={symbol} />
                        </div>
                      );
                    })}

                    <div className="h-1" ref={widgetsEndRef} />
                  </div>

                }

                {extraWidgets.length == 0 && (
                  <div className="flex items-center justify-center h-full text-gray-500 border-[gray] md:border-r">
                    Begin Chat To View Analysis
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`h-[calc((100dvh-55px)/0.45)] md:h-[calc(100dvh-55px)] overflow-hidden flex flex-col w-full md:w-[${horizontalSplit[1]}%]`}>
            <Chatbot extraWidgets={extraWidgets} setExtraWidgets={setExtraWidgets} />
          </div>
          
          {selectedWidget && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedWidget(null);
                }
              }}
            >
              <div className="bg-white rounded-xl w-[90vw] h-[90vh] p-4 relative">
                <button
                  onClick={() => setSelectedWidget(null)}
                  className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {selectedWidget && (
                  <div className="h-full w-full">
                    {(() => {
                      const widgetData = componentsMap[selectedWidget.type];
                      if (!widgetData) return null;
                      const { component: WidgetComponent, defaultProps } = widgetData;
                      return <WidgetComponent
                        {...defaultProps}
                        symbol={selectedWidget.symbol}
                        autosize={true}
                        height="100%"
                        width="100%"
                      />;
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Chat;
