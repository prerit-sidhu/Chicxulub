import argparse
import csv
import json
from tonsdk.utils import to_nano
from tonsdk.contract.wallet import Wallets, WalletVersionEnum
from tonsdk.contract import Address

def load_wallet(mnemonic_path):
    """Load wallet from mnemonic file"""
    try:
        with open(mnemonic_path, 'r') as f:
            mnemonic = f.read().strip().split()
        
        # Create wallet instance
        mnemonics = ' '.join(mnemonic)
        wallet = Wallets.create(
            version=WalletVersionEnum.v3r2,
            workchain=0,
            mnemonics=mnemonics
        )
        
        return wallet
    except Exception as e:
        print(f"Error loading wallet: {e}")
        return None

def load_recipients(csv_path):
    """Load recipients from CSV file"""
    recipients = []
    try:
        with open(csv_path, 'r') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                if len(row) >= 2:
                    address = row[0].strip()
                    amount = float(row[1].strip())
                    recipients.append({
                        'address': address,
                        'amount': amount
                    })
        return recipients
    except Exception as e:
        print(f"Error loading recipients: {e}")
        return []

def prepare_transfers(wallet, recipients, token_contract_address):
    """Prepare token transfer messages"""
    transfers = []
    
    for recipient in recipients:
        try:
            # Create transfer message for token contract
            payload = {
                "to": recipient['address'],
                "amount": to_nano(recipient['amount']),
                "payload": ""  # Optional comment or payload
            }
            
            # Add to transfers list
            transfers.append({
                "address": token_contract_address,
                "amount": to_nano(0.05),  # Gas for the token transfer
                "payload": json.dumps(payload)
            })
        except Exception as e:
            print(f"Error preparing transfer to {recipient['address']}: {e}")
    
    return transfers

def main():
    parser = argparse.ArgumentParser(description='Send CHIX tokens to multiple wallets')
    parser.add_argument('--mnemonic', required=True, help='Path to mnemonic file')
    parser.add_argument('--recipients', required=True, help='Path to CSV file with recipients')
    parser.add_argument('--token', required=True, help='Token contract address')
    
    args = parser.parse_args()
    
    # Load wallet
    wallet = load_wallet(args.mnemonic)
    if not wallet:
        return
    
    # Load recipients
    recipients = load_recipients(args.recipients)
    if not recipients:
        print("No recipients found")
        return
    
    print(f"Loaded {len(recipients)} recipients")
    
    # Prepare transfers
    transfers = prepare_transfers(wallet, recipients, args.token)
    
    # Display summary
    total_tokens = sum(r['amount'] for r in recipients)
    total_gas = len(transfers) * 0.05
    
    print(f"Total CHIX tokens to send: {total_tokens}")
    print(f"Estimated gas cost: {total_gas} TON")
    
    # Ask for confirmation
    confirm = input("Proceed with transfers? (y/n): ")
    if confirm.lower() != 'y':
        print("Operation cancelled")
        return
    
    # TODO: Implement actual sending logic
    # This would require connecting to TON network and sending the transactions
    print("Sending tokens...")
    print("This is a simulation - actual sending would be implemented here")
    
    print("Done!")

if __name__ == "__main__":
    main()