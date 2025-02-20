import { PanelRightOpen, Search, SquarePen } from "lucide-react";
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
import Chatbot2 from "../components/Chatbot";
import { useLayoutEffect, useRef, useState } from "react";

function Home2({ isSidebarOpen, setIsSidebarOpen }) {
  const [extraWidgets, setExtraWidgets] = useState([]);
  const widgetsEndRef = useRef(null);

  const scrollToBottom = () => {
    widgetsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  }, [extraWidgets]);
  
  // Components map with default props
  const componentsMap = {
    SymbolInfo: {
      component: SymbolInfo,
      defaultProps: { colorTheme: "light", autosize: true },
    },
    AdvancedRealTimeChart: {
      component: AdvancedRealTimeChart,
      defaultProps: { theme: "light", height: 500 },
    },
    CryptoCurrencyMarket: {
      component: CryptoCurrencyMarket,
      defaultProps: { colorTheme: "light", height: 500 },
    },
    TickerTape: {
      component: TickerTape,
      defaultProps: { colorTheme: "light", autosize: true },
    },
    Timeline: {
      component: Timeline,
      defaultProps: { theme: "light", height: 500 },
    },
    StockHeatmap: {
      component: StockHeatmap,
      defaultProps: { colorTheme: "light", height: 500 },
    },
    ForexCrossRates: {
      component: ForexCrossRates,
      defaultProps: { colorTheme: "light", height: 500 },
    },
    CryptoCoinsHeatmap: {
      component: CryptoCoinsHeatmap,
      defaultProps: { colorTheme: "light", height: 500 },
    }
  };

  return (
    <div className="h-full w-full">
      <div className="h-[calc(100dvh-50px)] w-full flex flex-row overflow-hidden">
        <div className="flex flex-col w-[50%] h-full">
          <div className="h-full flex flex-col overflow-y-auto p-5">
            <div className="h-full w-full">

            {extraWidgets.length !== 0 &&
              extraWidgets.map(({ graph_type, symbol }, index) => {
                const widgetData = componentsMap[graph_type]; // Get widget based on graph_type
                if (!widgetData) return null;
            
                const { component: WidgetComponent, defaultProps } = widgetData;
                return (
                  <div key={index} className="overflow-auto h-fit border rounded-xl my-10">
                    <WidgetComponent {...defaultProps} symbol={symbol} />
                  </div>
                );
              })
            }
            </div>
            <div className="" ref={widgetsEndRef} />
            </div>
        </div>

        <div className="h-full flex flex-col w-[50%]">
          <Chatbot2 extraWidgets={extraWidgets} setExtraWidgets={setExtraWidgets} />
        </div>
      </div>
    </div>
  );
}

export default Home2;
