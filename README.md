# OIB_Projekat_tim2_rp_n1
OIB Projekat - Tim 2 - Redovan projekat + nadogradnja I

> **Napomena:** Svaki mikoservis mora da ima bazu,validaciju,logovanje.

## Navigacija
- [Frontend](#frontend)
- [Gateway API](#gateway-api)
- [Production & Processing mikroservisi](#production-mikoservis-processing-mikoservis)
- [Packaging & Storage mikroservisi](#packaging-mikoservis-storage-mikoservis)
- [Sales & Analytics mikroservisi](#sales-mikroservis-analytics-mikoservis)
- [Performance & AuditLog mikroservisi](#performance-mikroservis-auditlog-mikoservis)


## TO-DO lista:
- ### Frontend:
  - [ ] Login / register UI
  - [ ] Stranice
    - [ ] proizvodnja
    - [ ] prerada
    - [ ] skladištenje
    - [ ] prodaja
  - [ ] Komponente
  - [ ] Povezivanje sa Gateway API-jem
  - [ ] Pretraga, sortiranje, tabele
  - [ ] PDF export prikaz

<br><hr>

- ### Gateway-api
  > Ova osoba omogućava da ostalih 5 mogu odmah da rade bez razmišljanja o mrežnim
  > problemima. Treba voditi računa o imenima metoda u ostalim mikroserivisa
  - [ x ] /auth/* → Auth Service (ima u template započeto samo dopuniti)
  - [ x ] /users/* → User Service (ima u template započeto samo dopuniti)
  - [ x ] /production/* → Production Service
  - [ x ] /processing/* → Processing Service
  - [ x ] /packaging/* → Packaging Service
  - [ x ] /storage/* → Storage Service
  - [ x ] /sales/* → Sales Service
  - [ x ] /analytics/* → Analytics Service
  - [ x ] /performance/* → Performance Analysis Service
  - [ x ] /audit/* → Audit Log Service
  - [ x ] .env + CORS konfiguracija za sve mikroserive (app.ts, .env)

<br><hr>

- ### Production mikoservis, Processing mikoservis
  - [ ] Production 
    - [ ] Domain: DTOs, modele(Plant), enum(PlantStatus)
    - [ ] ProductionService.ts
      - [ ] createPlant(dto: CreatePlantDto),
      - [ ] harvestPlant(id: string),
      - [ ] adjustIntensity(id: string, percent: number),
      - [ ] requestNewPlantFromProcessing(reason: string),
      - [ ] autoBalanceIntensity(plant, actualIntensity),
      - [ ] getAllPlants(filter) 
    - [ ] ProductionController.ts
      - [ ] POST /production/plants
      - [ ] PUT /production/plants/:id/intensity
      - [ ] POST /production/plants/:id/harvest
      - [ ] GET /production/
  - [ ] Processing
    - [ ] Domain: DTOs, modeli (Perfume), enum (PerfumeType, PerfumeStatus)
    - [ ] ProcessingService.ts
      - [ ] processPlants(dto: ProcessRequestDto)
      - [ ] calculateNeededPlants(count, volume)
      - [ ] sendPerfumesToPackaging(perfumes: Perfume[])
      - [ ] notifyProductionToPlantMore(intensity: number)
      - [ ] getPerfumes(filter)
    - [ ] ProcessingController.ts
      - [ ] POST /processing/process
      - [ ] GET /processing/perfumes

<br><hr>

- ### Packaging mikoservis, Storage mikoservis
  - [ ] Packaging
    - [ ] DTOs, modeli (Package), enum (PackageStatus)
    - [ ] PackagingService.ts
      - [ ] createPackage(dto: CreatePackageDto)
      - [ ] addPerfumesToPackage(packageId: string, perfumeIds: string[])
      - [ ] validateSinglePerfumeRule(perfumeId: string)
      - [ ] sendPackageToStorage(packageId: string)
      - [ ] getPackages(filter)
    - [ ] PackagingController.ts
      - [ ] POST /packaging/packages
      - [ ] POST /packaging/packages/:id/add
      - [ ] POST /packaging/packages/:id/send
      - [ ] GET /packaging/packages
  - [ ] Storage
    - [ ] Domain: modeli (SaleItem, Invoice), enum (SaleType, PaymentType)
    - [ ] StorageService.ts
      > Potrebno implemenitrati na dva načina ( DistributiveStorageStrategy,
      > WarehouseStorageStrategy )
      - [ ] deliverPackages(count: number, userRole: Role)
      - [ ] storePackage(package: Package)
      - [ ] getStoredPackages()
 
<hr><br>

- ### Sales mikroservis, Analytics mikoservis
  - [ ] Sales
    - [ ] SalesService.ts:
      - [ ] orderPerfumes(orderDto: OrderPerfumeDto)
      - [ ] requestPackagesFromStorage(count)
      - [ ] unpackPackage(packageId: string)
      - [ ] sendToAnalytics(perfumes: Perfume[])
      - [ ] getCatalog()
    - [ ] SalesController.ts:
      - [ ] POST /sales/order
      - [ ] GET /sales/catalog
  - [ ] Analytics
    - [ ] Domain: DTOs, modeli (Receipt, Report), enum (ReportType, PaymentType,
          AnalysisType)
    - [ ] AnalyticsService.ts:
      - [ ] createReceipt(dto: CreateReceiptDto)
      - [ ] generateReport(dto: GenerateReportDto)
      - [ ] calculateMonthly()
      - [ ] calculateYearly()
      - [ ] calculateTop10()
      - [ ] saveReport(report: Report)
      - [ ] getReports(filter)
      - [ ] exportReportPDF(reportId: string)
    - [ ] AnalyticsController.ts:
      - [ ] POST /analytics/receipts
      - [ ] POST /analytics/reports/generate
      - [ ] GET /analytics/reports
      - [ ] GET /analytics/reports/:id/pdf

<br><hr>
- ### Performance mikroservis, AuditLog mikoservis
  - [ ] Performance
    - [ ] Domain: DTOs, modeli (SimulationResult), enum (AlgorithmType)
    - [ ] PerformanceService.ts:
      - [ ] runSimulation(dto: SimulationRequestDto)
      - [ ] calculateEfficiencyScore(simulationData)
      - [ ] saveSimulation(result: SimulationResult)
      - [ ] listSimulations()
      - [ ] exportSimulationPDF(id: string)
    - [ ] PerformanceController.ts:
      - [ ] POST /performance/simulate
      - [ ] GET /performance/simulations
      - [ ] GET /performance/simulations/:id/pdf
  - [ ] AuditLog
    - [ ] Domain: DTOs, modeli (AuditLog), enum (AuditLogType)
    - [ ] AuditLogService.ts:
      - [ ] logEvent(dto: CreateLogDto)
      - [ ] getLogs(filter: FilterLogsDto)
    - [ ] AuditLogController.ts:
      - [ ] POST /audit/logs
      - [ ] GET /audit/logs





  
