import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth";

type AddressQRCodeModalProps = {
  address: AddressType;
  modalId: string;
};

export const AddressQRCodeModal = ({ address, modalId }: AddressQRCodeModalProps) => {
  return (
    <>
      <div className="tooltip tooltip-top" data-tip="Show QR Code">
        <label htmlFor={modalId} className="btn btn-sm btn-ghost btn-circle avatar">
          <div className="w-8 rounded-full">
            <QRCodeSVG value={address} size={32} />
          </div>
        </label>
      </div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 border-0 bg-transparent p-0" />
          <h3 className="text-lg font-bold mb-3">Scan QR code</h3>
          <div className="space-y-3">
            <div className="flex space-x-2 flex-col items-center gap-6 py-6">
              <QRCodeSVG value={address} size={256} />
              <Address address={address} format="long" disableAddressLink />
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
