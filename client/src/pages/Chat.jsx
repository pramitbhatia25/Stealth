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

function Chat({ isSidebarOpen, setIsSidebarOpen }) {
  const [extraWidgets, setExtraWidgets] = useState([]);
  const widgetsEndRef = useRef(null);
  const [selectedWidget, setSelectedWidget] = useState(null);

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
      defaultProps: { theme: "light", height:250, width: "100%" },
    },
    CryptoCurrencyMarket: {
      component: CryptoCurrencyMarket,
      defaultProps: { colorTheme: "light", height: 250, width: "100%" },
    },
    TickerTape: {
      component: TickerTape,
      defaultProps: { colorTheme: "light", autosize: true },
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
    <div className="h-full w-full">
      <div className="h-[calc(100dvh-50px)] w-full flex flex-row overflow-hidden">
        <div className="flex flex-col w-[50%] h-full">
          <div className="h-full flex flex-col overflow-y-auto p-5">
            <div className="h-full w-full">

            {extraWidgets.length !== 0 &&
              <div className="">              
                {extraWidgets.map(({ graph_type, symbol }, index) => {
                  const widgetData = componentsMap[graph_type]; // Get widget based on graph_type
                  if (!widgetData) return null;
              
                  const { component: WidgetComponent, defaultProps } = widgetData;
                  return (
                    <div key={index} className="relative overflow-auto h-fit max-h-[280px] border rounded-xl my-2 scrollbar-hide">
                      <button 
                        onClick={() => setSelectedWidget({ type: graph_type, symbol })}
                        className="absolute top-2 right-10 bg-white/80 hover:bg-white p-1.5 rounded-lg shadow-md z-10"
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
                <div className="text-black border flex items-center justify-center h-full text-gray-500">
                  Begin Chat To View Analysis
                </div>
              )}
            </div>
            </div>
        </div>

        <div className="h-full flex flex-col w-[50%] ">
          <Chatbot extraWidgets={extraWidgets} setExtraWidgets={setExtraWidgets} />
        </div>
      </div>

      {/* Fullscreen Modal */}
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
  );
}

export default Chat;
