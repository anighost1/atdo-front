
export default function ConfirmationModal({ title, message, action, yes = 'Yes', no = 'No' }) {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <form method="dialog" className="flex flex-row gap-2">
                        <button className="btn" onClick={action}>{yes}</button>
                        <button className="btn">{no}</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
