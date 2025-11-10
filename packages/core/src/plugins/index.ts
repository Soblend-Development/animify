
export interface AnimifyPlugin {
  name: string;
  version: string;
  install: (animify: any) => void;
}

export class PluginManager {
  private plugins: Map<string, AnimifyPlugin> = new Map();
  
  register(plugin: AnimifyPlugin) {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} ya está registrado`);
      return;
    }
    
    this.plugins.set(plugin.name, plugin);
    plugin.install(this);
    console.log(`✅ Plugin ${plugin.name} v${plugin.version} instalado`);
  }
  
  get(name: string): AnimifyPlugin | undefined {
    return this.plugins.get(name);
  }
  
  has(name: string): boolean {
    return this.plugins.has(name);
  }
  
  getAll(): AnimifyPlugin[] {
    return Array.from(this.plugins.values());
  }
}

export const pluginManager = new PluginManager();
