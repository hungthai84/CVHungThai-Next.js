import { ProfileKnowledge } from '../types/ai';

class AIProvider {
  public isAvailable(): boolean {
    return false;
  }

  public async generateAnswer(_question: string, _kb: ProfileKnowledge): Promise<string | null> {
    return null;
  }
}

export const aiProvider = new AIProvider();

