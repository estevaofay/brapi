CREATE TABLE IF NOT EXISTS "historical_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" varchar NOT NULL,
	"date" integer NOT NULL,
	"open" bigint,
	"high" bigint,
	"low" bigint,
	"close" bigint,
	"volume" bigint,
	"adjustedClose" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"age" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickers" (
	"symbol" varchar PRIMARY KEY NOT NULL,
	"currency" varchar,
	"twoHundredDayAverage" bigint NOT NULL,
	"twoHundredDayAverageChange" integer,
	"twoHundredDayAverageChangePercent" integer,
	"marketCap" bigint,
	"shortName" varchar,
	"longName" varchar,
	"regularMarketChange" integer,
	"regularMarketChangePercent" integer,
	"regularMarketTime" timestamp with time zone,
	"regularMarketPrice" bigint,
	"regularMarketDayHigh" bigint,
	"regularMarketDayRange" varchar,
	"regularMarketDayLow" bigint,
	"regularMarketVolume" bigint,
	"regularMarketPreviousClose" bigint,
	"regularMarketOpen" bigint,
	"averageDailyVolume3Month" bigint,
	"averageDailyVolume10Day" bigint,
	"fiftyTwoWeekLowChange" integer,
	"fiftyTwoWeekLowChangePercent" integer,
	"fiftyTwoWeekRange" varchar,
	"fiftyTwoWeekHighChange" integer,
	"fiftyTwoWeekHighChangePercent" integer,
	"fiftyTwoWeekLow" bigint,
	"fiftyTwoWeekHigh" bigint,
	"priceEarnings" bigint,
	"earningsPerShare" bigint,
	"logoUrl" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timestamps" (
	"date" integer PRIMARY KEY NOT NULL
);
