import { blo } from "blo";
import { Address, isAddress } from "viem";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

/**
 * Address input without ENS name resolution
 * Note: ENS functionality has been removed due to wallet dependencies
 */
export const AddressInput = ({ value, name, placeholder, onChange, disabled }: CommonInputProps<Address | string>) => {
  return (
    <InputBase<Address>
      name={name}
      placeholder={placeholder}
      error={value ? !isAddress(value) : false}
      value={value as Address}
      onChange={onChange}
      disabled={disabled}
      suffix={
        // Don't want to use nextJS Image here (and adding remote patterns for the URL)
        // eslint-disable-next-line @next/next/no-img-element
        value && <img alt="" className="rounded-full!" src={blo(value as `0x${string}`)} width="35" height="35" />
      }
    />
  );
};
