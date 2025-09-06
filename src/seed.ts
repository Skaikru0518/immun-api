import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource, Repository } from 'typeorm';
import { Receptor } from './receptors/entities/receptor.entity';
import { Cell } from './cells/entities/cell.entity';
import { Cytokine } from './cytokines/entities/cytokine.entity';
import { ReceptorType } from './receptors/enums/receptor-type.enum';
import { CellLineage } from './cells/enums/cell-lineage.enum';
import { CytokineType } from './cytokines/enums/cytokine-type.enum';

// Helper functions for idempotent seeding
async function getOrCreateReceptor(
  name: string,
  type: ReceptorType,
  fn: string,
  repo: Repository<Receptor>,
): Promise<Receptor> {
  let receptor = await repo.findOneBy({ name });
  if (!receptor) {
    receptor = repo.create({ name, type, function: fn });
    receptor = await repo.save(receptor);
    console.log(`✅ Created receptor: ${name}`);
  } else {
    console.log(`♻️  Reusing receptor: ${name}`);
  }
  return receptor;
}

async function getOrCreateCell(
  name: string,
  lineage: CellLineage,
  fn: string,
  receptors: Receptor[],
  repo: Repository<Cell>,
): Promise<Cell> {
  let cell = await repo.findOne({ where: { name }, relations: ['receptors'] });
  if (!cell) {
    cell = repo.create({ name, lineage, function: fn, receptors });
    cell = await repo.save(cell);
    console.log(`✅ Created cell: ${name}`);
  } else {
    console.log(`♻️  Reusing cell: ${name}`);
  }
  return cell;
}

async function getOrCreateCytokine(
  name: string,
  type: CytokineType,
  fn: string,
  producingCells: Cell[],
  repo: Repository<Cytokine>,
): Promise<Cytokine> {
  let cytokine = await repo.findOne({
    where: { name },
    relations: ['producingCells'],
  });
  if (!cytokine) {
    cytokine = repo.create({ name, type, function: fn, producingCells });
    cytokine = await repo.save(cytokine);
    console.log(`✅ Created cytokine: ${name}`);
  } else {
    console.log(`♻️  Reusing cytokine: ${name}`);
  }
  return cytokine;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const receptorRepo = dataSource.getRepository(Receptor);
  const cellRepo = dataSource.getRepository(Cell);
  const cytokineRepo = dataSource.getRepository(Cytokine);

  console.log('🌱 Starting seed process...\n');

  /** ====================== RECEPTORS ====================== **/
  console.log('📡 Creating/checking receptors...');

  const cd4 = await getOrCreateReceptor(
    'CD4',
    ReceptorType.CHEMOKINE_RECEPTOR,
    'Co-receptor for MHC-II recognition',
    receptorRepo,
  );
  const cd8 = await getOrCreateReceptor(
    'CD8',
    ReceptorType.CHEMOKINE_RECEPTOR,
    'Co-receptor for MHC-I recognition',
    receptorRepo,
  );
  const il2r = await getOrCreateReceptor(
    'IL-2R',
    ReceptorType.INTERLEUKIN_RECEPTOR,
    'IL-2 signaling, T cell proliferation',
    receptorRepo,
  );
  const tnfr1 = await getOrCreateReceptor(
    'TNFR1',
    ReceptorType.TNF_RECEPTOR,
    'Mediates TNF-alpha signaling, apoptosis',
    receptorRepo,
  );
  const cd28 = await getOrCreateReceptor(
    'CD28',
    ReceptorType.COSTIMULATORY,
    'Co-stimulatory receptor on T cells',
    receptorRepo,
  );
  const ctla4 = await getOrCreateReceptor(
    'CTLA-4',
    ReceptorType.COSTIMULATORY,
    'Inhibitory receptor on T cells',
    receptorRepo,
  );
  const tcr = await getOrCreateReceptor(
    'TCR',
    ReceptorType.ANTIGEN_RECEPTOR,
    'Recognizes antigen-MHC complexes',
    receptorRepo,
  );
  const bcr = await getOrCreateReceptor(
    'BCR',
    ReceptorType.ANTIGEN_RECEPTOR,
    'Antigen receptor of B cells (surface Ig)',
    receptorRepo,
  );
  const fcgr = await getOrCreateReceptor(
    'FcγR',
    ReceptorType.Fc_RECEPTOR,
    'Binds IgG Fc region, ADCC by NK cells and phagocytes',
    receptorRepo,
  );
  const cxcr5 = await getOrCreateReceptor(
    'CXCR5',
    ReceptorType.CHEMOKINE_RECEPTOR,
    'Guides B cells to follicles',
    receptorRepo,
  );
  const ccr7 = await getOrCreateReceptor(
    'CCR7',
    ReceptorType.CHEMOKINE_RECEPTOR,
    'Guides T cells/DCs to lymph node',
    receptorRepo,
  );

  /** ====================== CELLS ====================== **/
  console.log('\n🦠 Creating/checking cells...');

  const tHelper = await getOrCreateCell(
    'CD4+ T helper cell',
    CellLineage.LYMPHOID,
    'Coordinates adaptive immune response',
    [cd4, il2r, cd28, tcr],
    cellRepo,
  );

  const cytotoxicT = await getOrCreateCell(
    'CD8+ Cytotoxic T cell',
    CellLineage.LYMPHOID,
    'Kills virus-infected cells',
    [cd8, il2r, tcr],
    cellRepo,
  );

  const macrophage = await getOrCreateCell(
    'Macrophage',
    CellLineage.MYELOID,
    'Phagocytosis of pathogens, antigen presentation',
    [tnfr1, fcgr],
    cellRepo,
  );

  const tReg = await getOrCreateCell(
    'Regulatory T cell (Treg)',
    CellLineage.LYMPHOID,
    'Suppresses immune responses',
    [ctla4, il2r],
    cellRepo,
  );

  const bCell = await getOrCreateCell(
    'B cell',
    CellLineage.LYMPHOID,
    'Produces antibodies and presents antigens',
    [bcr, cxcr5],
    cellRepo,
  );

  const nkCell = await getOrCreateCell(
    'NK cell',
    CellLineage.LYMPHOID,
    'Kills virus-infected and tumor cells',
    [fcgr, il2r],
    cellRepo,
  );

  const dendriticCell = await getOrCreateCell(
    'Dendritic cell',
    CellLineage.MYELOID,
    'Most potent antigen-presenting cell',
    [ccr7],
    cellRepo,
  );

  const neutrophil = await getOrCreateCell(
    'Neutrophil',
    CellLineage.MYELOID,
    'First line defense, phagocytosis, inflammation',
    [fcgr],
    cellRepo,
  );

  /** ====================== CYTOKINES ====================== **/
  console.log('\n🧬 Creating/checking cytokines...');

  const il2 = await getOrCreateCytokine(
    'IL-2',
    CytokineType.PRO_INFLAMMATORY,
    'Induces growth of T cells',
    [tHelper, cytotoxicT],
    cytokineRepo,
  );

  const tnfAlpha = await getOrCreateCytokine(
    'TNF-alpha',
    CytokineType.PRO_INFLAMMATORY,
    'Promotes inflammation and apoptosis',
    [macrophage],
    cytokineRepo,
  );

  const ifnGamma = await getOrCreateCytokine(
    'IFN-gamma',
    CytokineType.CHEMOKINE,
    'Activates macrophages and NK cells',
    [tHelper, nkCell],
    cytokineRepo,
  );

  const il4 = await getOrCreateCytokine(
    'IL-4',
    CytokineType.ANTI_INFLAMMATORY,
    'Promotes Th2 differentiation, B cell support',
    [tHelper, bCell],
    cytokineRepo,
  );

  const il10 = await getOrCreateCytokine(
    'IL-10',
    CytokineType.ANTI_INFLAMMATORY,
    'Suppresses immune responses, regulatory cytokine',
    [tReg],
    cytokineRepo,
  );

  const il12 = await getOrCreateCytokine(
    'IL-12',
    CytokineType.PRO_INFLAMMATORY,
    'Promotes Th1 responses',
    [dendriticCell, macrophage],
    cytokineRepo,
  );

  const il17 = await getOrCreateCytokine(
    'IL-17',
    CytokineType.PRO_INFLAMMATORY,
    'Promotes neutrophil recruitment, autoimmunity',
    [tHelper, neutrophil],
    cytokineRepo,
  );

  const tgfBeta = await getOrCreateCytokine(
    'TGF-beta',
    CytokineType.ANTI_INFLAMMATORY,
    'Tissue repair, immune regulation',
    [tReg, macrophage],
    cytokineRepo,
  );

  const gmCsf = await getOrCreateCytokine(
    'GM-CSF',
    CytokineType.GROWTH_FACTOR,
    'Stimulates production of myeloid cells',
    [tHelper, dendriticCell],
    cytokineRepo,
  );

  const cxcl8 = await getOrCreateCytokine(
    'CXCL8 (IL-8)',
    CytokineType.CHEMOKINE,
    'Recruits neutrophils to sites of infection',
    [macrophage, dendriticCell, neutrophil],
    cytokineRepo,
  );

  console.log('\n🎉 Seed process completed successfully!');
  console.log(`📊 Final counts:`);
  console.log(`   - Receptors: ${await receptorRepo.count()}`);
  console.log(`   - Cells: ${await cellRepo.count()}`);
  console.log(`   - Cytokines: ${await cytokineRepo.count()}`);

  await app.close();
}

bootstrap().catch(console.error);
