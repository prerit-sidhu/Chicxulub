import { 
  Cell,
  Slice, 
  Address, 
  Builder, 
  beginCell, 
  ComputeError, 
  TupleItem, 
  TupleReader, 
  Dictionary, 
  contractAddress, 
  ContractProvider, 
  Sender, 
  Contract, 
  ContractABI, 
  ABIType,
  ABIGetter,
  ABIReceiver,
} from '@ton/core';

export type ChicxulubConfig = {
  owner: Address;
  fee: bigint;
};

export function chicxulubConfigToCell(config: ChicxulubConfig): Cell {
  return beginCell()
    .storeAddress(config.owner)
    .storeCoins(config.fee)
    .endCell();
}

export class Chicxulub implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new Chicxulub(address);
  }

  static createFromConfig(config: ChicxulubConfig, code: Cell, workchain = 0) {
    const data = chicxulubConfigToCell(config);
    const init = { code, data };
    return new Chicxulub(contractAddress(workchain, init), init);
  }

  async sendPayFee(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeUint(0, 32) // op code for pay fee
      .endCell();
    
    await provider.internal(via, {
      value: "500000000", // 0.5 TON
      body: messageBody,
    });
  }

  async getOwner(provider: ContractProvider) {
    const result = await provider.get('get_owner', []);
    return result.stack.readAddress();
  }

  async getFee(provider: ContractProvider) {
    const result = await provider.get('get_fee', []);
    return result.stack.readBigNumber();
  }

  async getHasPaid(provider: ContractProvider, address: Address) {
    const result = await provider.get('has_paid', [
      { type: 'slice', cell: beginCell().storeAddress(address).endCell() },
    ]);
    return result.stack.readBoolean();
  }
}