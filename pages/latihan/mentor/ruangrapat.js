import { DataTable } from 'primereact/datatable'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ruangrapat = () => {
    const [ruangRapats, setRuangRapats] = useState(null);
    const [selectedRuangRapat, setSelectedRuangRapat] = useState(null);
    const [ruangRapatDialog, setRuangRapatDialog] = useState(false);
    const [deleteRuangRapatDialog, setDeleteRuangRapatDialog] = useState(false);
    const [deleteRuangRapatsDialog, setDeleteRuangRapatsDialog] = useState(false);
    let emptyRuangRapat = { kdrapat: null, nmrapat: "", letak: "", luas: "0", kapasitas: "0", fasilitas: "", unit: "", kdaktif: "1", gambar: "" };
    const [ruangRapat, setRuangRapat] = useState(emptyRuangRapat);
    const [selectedRuangRapats, setSelectedRuangRapats] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getruangRapats();
    }, []);

    const getruangRapats = async () => {
        try {
            const res = await axios.get(process.env.SERVER_API + 'ruangRapat/getRuangRapats');
            setRuangRapats(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const openNew = () => {
        setRuangRapat(emptyRuangRapat);
        setSubmitted(false);
        setRuangRapatDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRuangRapatDialog(false);
    };

    const hideDeleteRuangRapatDialog = () => {
        setDeleteRuangRapatDialog(false);
    };

    const hideDeleteRuangRapatsDialog = () => {
        setDeleteRuangRapatsDialog(false);
    };

    const saveRuangRapat = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (ruangRapat.nmrapat.trim() && ruangRapat.letak.trim()) {
            const operasi = ruangRapat.kdrapat != null ? 'updateRuangRapat' : 'insertRuangRapat';
            try {
                const res = await axios.post(process.env.SERVER_API + 'ruangRapat/' + operasi, {
                    data: ruangRapat
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: res.data.msg, life: 3000 });
                setRuangRapatDialog(false);
                setRuangRapat(emptyRuangRapat);
                await getruangRapats();
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.msg);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.msg, life: 3000 });
                }

            }
        }
    };

    let coba = async () => {
        const res = await axios.post(process.env.SERVER_API + 'ruangRapat/insertRuangRapat', {
            // data: ruangRapat
        }).then(res => {
            // console.log(res);
            return res
        }).catch((err) => {
            // deal with err, such as toggle loading state, recover click and scroll.
            // this.loading = false;
            // recover the reject state before.
            return Promise.reject(err);
        });


    }

    const editRuangRapat = (ruang) => {
        setRuangRapat({ ...ruang });
        setRuangRapatDialog(true);
    };

    const confirmDeleteRuangRapat = (ruang) => {
        setRuangRapat(ruang);
        setDeleteRuangRapatDialog(true);
    };

    const deleteRuangRapat = async() => {
        try {
            const res = await axios.post(process.env.SERVER_API + 'ruangRapat/deleteRuangRapat', {
                kdrapat: ruangRapat.kdrapat
            });
            toast.current.show({ severity: 'success', summary: 'Successful', detail: "Delete sukses", life: 3000 });
            setDeleteRuangRapatDialog(false);
            setRuangRapat(emptyRuangRapat);
            await getruangRapats();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.msg, life: 3000 });
            }

        }

        // setDeleteRuangRapatDialog(false);
        // setRuangRapat(emptyRuangRapat);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'API Delete Ruang rapat belum dibuat', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteRuangRapatsDialog(true);
    };

    const deleteSelectedRuangRapats = () => {
        setDeleteRuangRapatsDialog(false);
        setSelectedRuangRapats(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'API belum dibikin', life: 3000 });
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Ruang Rapat</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const ruangRapatDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveRuangRapat} />
        </React.Fragment>
    );
    
    const deleteRuangRapatDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRuangRapatDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteRuangRapat} />
        </React.Fragment>
    );

    const deleteRuangRapatsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteRuangRapatsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedRuangRapats} />
        </React.Fragment>
    );

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedRuangRapats || !selectedRuangRapats.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const kdaktifBodyTemplate = (rowData) => {
        return rowData.kdaktif == '1' ? 'Aktif' : 'Non aktif';
    };

    const gambarBodyTemplate = (rowData) => {
        return <img src={`/ruangrapat/images/${rowData.gambar}`} alt={rowData.gambar} className="w-6rem shadow-2 border-round" />;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _ruangrapat = { ...ruangRapat };
        _ruangrapat[`${name}`] = val;
        setRuangRapat(_ruangrapat);
    };

    const onInputAngkaChange = (e, name) => {
        const val = (e.value) || null;
        let _ruangrapat = { ...ruangRapat };
        _ruangrapat[`${name}`] = val;
        setRuangRapat(_ruangrapat);
    };

    const onAktifChange = (e) => {
        const val = e.checked;
        let _ruangrapat = { ...ruangRapat };
        _ruangrapat['kdaktif'] = val ? 1 : 0;;
        setRuangRapat(_ruangrapat);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editRuangRapat(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteRuangRapat(rowData)} />
            </React.Fragment>
        );
    };

    const onUpload = (event) => {
        let _ruangrapat = { ...ruangRapat };
        _ruangrapat['gambar'] = event.files[0].name;
        setRuangRapat(_ruangrapat);
         toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };

    const onUploadError = () => {
         toast.current.show({ severity: 'error', summary: 'Fail', detail: 'File fail Uploaded', life: 3000 });
       
    };

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Ruang Rapat</h5>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={ruangRapats} selection={selectedRuangRapats} onSelectionChange={(e) => setSelectedRuangRapats(e.value)}
                        dataKey="kdrapat" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ruang rapat" globalFilter={globalFilter} header={header}>
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="kdrapat" header="Kode" sortable style={{ minWidth: '6rem' }}></Column>
                        <Column field="nmrapat" header="Nama" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="letak" header="Letak" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="luas" header="Luas" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="kapasitas" header="Kapasitas Kursi" sortable style={{ minWidth: '6rem' }}></Column>
                        <Column field="fasilitas" header="Fasilitas" sortable style={{ minWidth: '20rem' }}></Column>
                        <Column field="unit" header="Pengelola" sortable style={{ minWidth: '15rem' }}></Column>
                        <Column field="gambar" header="Gambar" body={gambarBodyTemplate}></Column>
                        <Column field="kdaktif" header="Status" sortable style={{ minWidth: '8rem' }} body={kdaktifBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={ruangRapatDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Ruang Rapat" modal className=" p-fluid" footer={ruangRapatDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="nmrapat" className="font-bold">
                            Nama Ruang
                        </label>
                        <InputText id="nmrapat" value={ruangRapat.nmrapat} onChange={(e) => onInputChange(e, 'nmrapat')} required autoFocus className={classNames({ 'p-invalid': submitted && !ruangRapat.nmrapat })} />
                        {submitted && !ruangRapat.nmrapat && <small className="p-error">Nama ruang is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="letak" className="font-bold">
                            Letak Ruang
                        </label>
                        <InputText id="letak" value={ruangRapat.letak} onChange={(e) => onInputChange(e, 'letak')} required className={classNames({ 'p-invalid': submitted && !ruangRapat.letak })} />
                        {submitted && !ruangRapat.letak && <small className="p-error">Letak is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="luas" className="font-bold">
                            Luas Ruang
                        </label>
                        <InputNumber id="luas" value={ruangRapat.luas} onChange={(e) => onInputAngkaChange(e, 'luas')} className={classNames({ 'p-invalid': submitted && !ruangRapat.luas })} minFractionDigits={1} suffix=' m2' />
                    </div>
                    <div className="field">
                        <label htmlFor="kapasitas" className="font-bold">
                            Kapasitas Ruang
                        </label>
                        <InputNumber id="kapasitas" value={ruangRapat.kapasitas} onChange={(e) => onInputAngkaChange(e, 'kapasitas')} className={classNames({ 'p-invalid': submitted && !ruangRapat.kapasitas })} suffix=' orang' />
                    </div>
                    <div className="field">
                        <label htmlFor="fasilitas" className="font-bold">
                            Fasilitas Ruang
                        </label>
                        <InputText id="fasilitas" value={ruangRapat.fasilitas} onChange={(e) => onInputChange(e, 'fasilitas')} className={classNames({ 'p-invalid': submitted && !ruangRapat.fasilitas })} />
                    </div>
                    <div className="field">
                        <label htmlFor="unit" className="font-bold">
                            Unit Pengelola
                        </label>
                        <InputText id="unit" value={ruangRapat.unit} onChange={(e) => onInputChange(e, 'unit')} className={classNames({ 'p-invalid': submitted && !ruangRapat.unit })} />
                    </div>
                    <div className="field">
                        <label htmlFor="gambar" className="font-bold">
                            Gambar
                        </label>
                        <FileUpload name="gambar[]" url="/api/uploadGambarRuangRapat" onUpload={onUpload}  onError={onUploadError} accept="image/*" maxFileSize={1000000} />
                    </div>
                    
                    <div className="flex align-items-center">
                        <Checkbox inputid="kdaktif" checked={ruangRapat.kdaktif == 1} onChange={(e) => onAktifChange(e)} className="mr-2"></Checkbox>
                        <label htmlFor="kdaktif" className="font-bold">Aktif</label>
                    </div>
                </Dialog>

                <Dialog visible={deleteRuangRapatDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRuangRapatDialogFooter} onHide={hideDeleteRuangRapatDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {ruangRapat && (
                            <span>
                                Are you sure you want to delete <b>{ruangRapat.nmrapat}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog visible={deleteRuangRapatsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRuangRapatsDialogFooter} onHide={hideDeleteRuangRapatsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {ruangrapat && <span>Are you sure you want to delete the selected ruang rapat?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default ruangrapat