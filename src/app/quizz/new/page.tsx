import UploadDoc from "../UploadDoc";



function page() {
  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col flex-1 gap-4 items-center text-center mt-24">
        <h2 className="text-3xl font-light mb-4">What do you want to be quizzed about?</h2>
        <UploadDoc />
      </main>
    </div>
  );
}

export default page;
