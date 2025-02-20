import { PanelRightClose, PanelRightOpen, Search, SquarePen } from "lucide-react";
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
                    <div key={index} className="overflow-auto h-fit max-h-[280px] border rounded-xl my-2 scrollbar-hide">
                      <WidgetComponent {...defaultProps} symbol={symbol} />
                    </div>
                  );
                })}

                <div className="h-1" ref={widgetsEndRef} />
                </div>

            }
            
              {extraWidgets.length == 0 && (
                <div className="text-black border flex items-center justify-center h-full">
                  Begin Chat To View Analysis -{">"}
                </div>
              )}
            </div>
            </div>
        </div>

        <div className="h-full flex flex-col w-[50%] ">
          <Chatbot extraWidgets={extraWidgets} setExtraWidgets={setExtraWidgets} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
