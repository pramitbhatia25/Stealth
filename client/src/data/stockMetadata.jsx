const stockMetadata = {
    "AAPL": {
        fullName: "Apple Inc.",
        url: "/stocks/AAPL",
        image: "https://logo.clearbit.com/apple.com"
    },
    "NVDA": {
        fullName: "NVIDIA Corporation",
        url: "/stocks/NVDA",
        image: "https://logo.clearbit.com/nvidia.com"
    },
    "MSFT": {
        fullName: "Microsoft Corporation",
        url: "/stocks/MSFT",
        image: "https://logo.clearbit.com/microsoft.com"
    },
    "AMZN": {
        fullName: "Amazon.com Inc.",
        url: "/stocks/AMZN",
        image: "https://logo.clearbit.com/amazon.com"
    },
    "GOOG": {
        fullName: "Alphabet Inc. (Google)",
        url: "/stocks/GOOG",
        image: "https://logo.clearbit.com/abc.xyz"
    },
    "META": {
        fullName: "Meta Platforms Inc.",
        url: "/stocks/META",
        image: "https://logo.clearbit.com/meta.com"
    },
    "TSLA": {
        fullName: "Tesla Inc.",
        url: "/stocks/TSLA",
        image: "https://logo.clearbit.com/tesla.com"
    },
    "AVGO": {
        fullName: "Broadcom Inc.",
        url: "/stocks/AVGO",
        image: "https://logo.clearbit.com/broadcom.com"
    },
    "LLY": {
        fullName: "Eli Lilly and Company",
        url: "/stocks/LLY",
        image: "https://logo.clearbit.com/lilly.com"
    },
    "WMT": {
        fullName: "Walmart Inc.",
        url: "/stocks/WMT",
        image: "https://logo.clearbit.com/walmart.com"
    },
    "JPM": {
        fullName: "JPMorgan Chase & Co.",
        url: "/stocks/JPM",
        image: "https://logo.clearbit.com/jpmorganchase.com"
    },
    "V": {
        fullName: "Visa Inc.",
        url: "/stocks/V",
        image: "https://logo.clearbit.com/visa.com"
    },
    "XOM": {
        fullName: "Exxon Mobil Corporation",
        url: "/stocks/XOM",
        image: "https://logo.clearbit.com/exxonmobil.com"
    },
    "MA": {
        fullName: "Mastercard Inc.",
        url: "/stocks/MA",
        image: "https://logo.clearbit.com/mastercard.com"
    },
    "UNH": {
        fullName: "UnitedHealth Group Incorporated",
        url: "/stocks/UNH",
        image: "https://logo.clearbit.com/unitedhealthgroup.com"
    },
    "HD": {
        fullName: "The Home Depot Inc.",
        url: "/stocks/HD",
        image: "https://logo.clearbit.com/homedepot.com"
    },
    "PG": {
        fullName: "Procter & Gamble Co.",
        url: "/stocks/PG",
        image: "https://logo.clearbit.com/pg.com"
    },
    "CVX": {
        fullName: "Chevron Corporation",
        url: "/stocks/CVX",
        image: "https://logo.clearbit.com/chevron.com"
    },
    "KO": {
        fullName: "The Coca-Cola Company",
        url: "/stocks/KO",
        image: "https://logo.clearbit.com/coca-cola.com"
    },
    "PEP": {
        fullName: "PepsiCo Inc.",
        url: "/stocks/PEP",
        image: "https://logo.clearbit.com/pepsico.com"
    },
    "MRK": {
        fullName: "Merck & Co. Inc.",
        url: "/stocks/MRK",
        image: "https://logo.clearbit.com/merck.com"
    },
    "ABBV": {
        fullName: "AbbVie Inc.",
        url: "/stocks/ABBV",
        image: "https://logo.clearbit.com/abbvie.com"
    },
    "PFE": {
        fullName: "Pfizer Inc.",
        url: "/stocks/PFE",
        image: "https://logo.clearbit.com/pfizer.com"
    },
    "BAC": {
        fullName: "Bank of America Corporation",
        url: "/stocks/BAC",
        image: "https://logo.clearbit.com/bankofamerica.com"
    },
    "CSCO": {
        fullName: "Cisco Systems Inc.",
        url: "/stocks/CSCO",
        image: "https://logo.clearbit.com/cisco.com"
    },
    "ACN": {
        fullName: "Accenture plc",
        url: "/stocks/ACN",
        image: "https://logo.clearbit.com/accenture.com"
    },
    "NFLX": {
        fullName: "Netflix Inc.",
        url: "/stocks/NFLX",
        image: "https://logo.clearbit.com/netflix.com"
    },
    "INTC": {
        fullName: "Intel Corporation",
        url: "/stocks/INTC",
        image: "https://logo.clearbit.com/intel.com"
    },
    "CMCSA": {
        fullName: "Comcast Corporation",
        url: "/stocks/CMCSA",
        image: "https://logo.clearbit.com/comcast.com"
    },
    "T": {
        fullName: "AT&T Inc.",
        url: "/stocks/T",
        image: "https://logo.clearbit.com/att.com"
    },
    "VZ": {
        fullName: "Verizon Communications Inc.",
        url: "/stocks/VZ",
        image: "https://logo.clearbit.com/verizon.com"
    },
    "ADBE": {
        fullName: "Adobe Inc.",
        url: "/stocks/ADBE",
        image: "https://logo.clearbit.com/adobe.com"
    },
    "CRM": {
        fullName: "Salesforce Inc.",
        url: "/stocks/CRM",
        image: "https://logo.clearbit.com/salesforce.com"
    },
    "NKE": {
        fullName: "Nike Inc.",
        url: "/stocks/NKE",
        image: "https://logo.clearbit.com/nike.com"
    },
    "ORCL": {
        fullName: "Oracle Corporation",
        url: "/stocks/ORCL",
        image: "https://logo.clearbit.com/oracle.com"
    },
    "ABT": {
        fullName: "Abbott Laboratories",
        url: "/stocks/ABT",
        image: "https://logo.clearbit.com/abbott.com"
    },
    "MCD": {
        fullName: "McDonald's Corporation",
        url: "/stocks/MCD",
        image: "https://logo.clearbit.com/mcdonalds.com"
    },
    "DHR": {
        fullName: "Danaher Corporation",
        url: "/stocks/DHR",
        image: "https://logo.clearbit.com/danaher.com"
    },
    "WFC": {
        fullName: "Wells Fargo & Company",
        url: "/stocks/WFC",
        image: "https://logo.clearbit.com/wellsfargo.com"
    },
    "MDT": {
        fullName: "Medtronic plc",
        url: "/stocks/MDT",
        image: "https://logo.clearbit.com/medtronic.com"
    },
    "BMY": {
        fullName: "Bristol-Myers Squibb Company",
        url: "/stocks/BMY",
        image: "https://logo.clearbit.com/bms.com"
    },
    "TXN": {
        fullName: "Texas Instruments Incorporated",
        url: "/stocks/TXN",
        image: "https://logo.clearbit.com/ti.com"
    },
    "NEE": {
        fullName: "NextEra Energy Inc.",
        url: "/stocks/NEE",
        image: "https://logo.clearbit.com/nexteraenergy.com"
    },
    "PM": {
        fullName: "Philip Morris International Inc.",
        url: "/stocks/PM",
        image: "https://logo.clearbit.com/pmi.com"
    },
    "LIN": {
        fullName: "Linde plc",
        url: "/stocks/LIN",
        image: "https://logo.clearbit.com/linde.com"
    },
    "HON": {
        fullName: "Honeywell International Inc.",
        url: "/stocks/HON",
        image: "https://logo.clearbit.com/honeywell.com"
    },
    "QCOM": {
        fullName: "Qualcomm Incorporated",
        url: "/stocks/QCOM",
        image: "https://logo.clearbit.com/qualcomm.com"
    },
    "COST": {
        fullName: "Costco Wholesale Corporation",
        url: "/stocks/COST",
        image: "https://logo.clearbit.com/costco.com"
    },
    "AMGN": {
        fullName: "Amgen Inc.",
        url: "/stocks/AMGN",
        image: "https://logo.clearbit.com/amgen.com"
    }
};


export default stockMetadata;