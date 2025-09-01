import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { cnpjService } from './services/cnpj';
import { cnaeService } from './services/cnae';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// CNPJ routes
app.get('/api/cnpj/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const result = await cnpjService.getCNPJ(cnpj);
    
    if (!result) {
      return res.status(502).json({
        error: 'Serviços externos indisponíveis',
        source: 'external'
      });
    }
    
    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Erro ao consultar CNPJ'
    });
  }
});

// CNAE routes
app.get('/api/cnae/classes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cnaeService.getClasse(id);
    
    if (!result) {
      return res.status(502).json({
        error: 'Serviço IBGE indisponível',
        source: 'external'
      });
    }
    
    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Erro ao consultar classe CNAE'
    });
  }
});

app.get('/api/cnae/subclasses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cnaeService.getSubclasse(id);
    
    if (!result) {
      return res.status(502).json({
        error: 'Serviço IBGE indisponível',
        source: 'external'
      });
    }
    
    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Erro ao consultar subclasse CNAE'
    });
  }
});

app.get('/api/cnae/classes', async (req, res) => {
  try {
    const result = await cnaeService.getClasses();
    
    if (result.length === 0) {
      return res.status(502).json({
        error: 'Serviço IBGE indisponível',
        source: 'external'
      });
    }
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar classes CNAE'
    });
  }
});

app.get('/api/cnae/subclasses', async (req, res) => {
  try {
    const result = await cnaeService.getSubclasses();
    
    if (result.length === 0) {
      return res.status(502).json({
        error: 'Serviço IBGE indisponível',
        source: 'external'
      });
    }
    
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao buscar subclasses CNAE'
    });
  }
});

// Cache management
app.post('/api/cache/clear', (req, res) => {
  try {
    cnpjService.clearCache();
    cnaeService.clearCache();
    res.json({ message: 'Cache limpo com sucesso' });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Erro ao limpar cache'
    });
  }
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rCnpj rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
