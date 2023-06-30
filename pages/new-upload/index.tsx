import { DropzoneButton } from '../../components/NewUpload/DropzoneButton';
import UploadTabs from '../../components/NewUpload/UploadTabs';

export default function TestPage() {
  return (
    <main>
      <div className="flex justify-center">
        <UploadTabs />
      </div>
      <DropzoneButton />
    </main>
  );
}
