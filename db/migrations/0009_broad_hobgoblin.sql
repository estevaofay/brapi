ALTER TABLE "tickers" RENAME TO "Tickers";--> statement-breakpoint
ALTER TABLE "historical_data" RENAME TO "HistoricalDatas";--> statement-breakpoint
ALTER TABLE "HistoricalDatas" DROP CONSTRAINT "historical_data_symbol_date_unique";--> statement-breakpoint
ALTER TABLE "HistoricalDatas" ADD CONSTRAINT "HistoricalDatas_symbol_date_unique" UNIQUE("symbol","date");