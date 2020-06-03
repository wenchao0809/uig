export namespace Interface {
    export interface IProperty {
      id: number;
      scope: string;
      type: string;
      pos: number;
      name: string;
      rule?: string;
      value: string;
      description: string;
      parentId: number;
      priority: number;
      interfaceId: number;
      creatorId: number;
      moduleId: number;
      repositoryId: number;
      required: boolean;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: any;
    }
  
    export interface IRoot {
      id: number;
      name: string;
      url: string;
      method: string;
      description: string;
      priority: number;
      status: number;
      creatorId: number;
      lockerId?: any;
      moduleId: number;
      repositoryId: number;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: any;
      locker?: any;
      properties: Array<IProperty>;
    }
  }
  
  export type Intf = Interface.IRoot & { modelName: string };
  
  export interface Module {
    id: number;
    name: string;
    description: string;
    priority: number;
    creatorId: number;
    repositoryId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    interfaces: Array<Intf>;
  }
  
  export interface Collaborator {
    id: number;
    name: string;
    description: string;
    logo?: any;
    visibility: boolean;
    ownerId: number;
    organizationId?: any;
    creatorId: number;
    lockerId?: any;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: any;
  }
  
  /** url 匹配函数 */
  export interface IUrlMapper {
    (url: string): string;
  }
  
  /** 生成出的代码 */
  export interface IGeneratedCode {
    /** 顶部 import */
    import: string;
    body: string;
    export: string;
  }
  
  /** create 函数的参数 */
  export interface ICreatorExtr {
    rapUrl: string;
    resSelector: string;
  }
  /** rp配置 */
  export interface UgiConfig {
    /** 必填，redux、normal 等 */
    type: RAPPER_TYPE;
    /** 必填，api仓库地址，从仓库的数据按钮可以获得 */
    apiUrl: string;
    /** 选填，rap平台前端地址，默认是 http://rap2.taobao.org */
    rapUrl?: string;
    /** 选填，生成出 rapper 的文件夹地址, 默认 ./src/rapper */
    rapperPath?: string;
    /** 选填，url映射，可用来将复杂的url映射为简单的url */
    urlMapper?: IUrlMapper;
    /** 选填，输出模板代码的格式 */
    codeStyle?: {};
    /** 选填，类型变换 type Selector<T> = T */
    resSelector?: string;
  }
