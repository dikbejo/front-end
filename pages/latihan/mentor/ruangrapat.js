import { DataTable } from 'primereact/datatable'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import {Toolbar} from 'primereact/toolbar'
import {Dialog} from 'primereact/dialog'
import { classNames } from 'primereact/utils';
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

    const saveRuangRapat = async() => {
        setSubmitted(true);

        if (ruangRapat.nmrapat.trim()) {
            // let _products = [...products];
            // let _product = { ...product };

            // if (product.id) {
            //     const index = findIndexById(product.id);

            //     _products[index] = _product;
            //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            // } else {
            //     _product.id = createId();
            //     _product.image = 'product-placeholder.svg';
            //     _products.push(_product);
            //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            // }

            // setProducts(_products);
      
            const res = saveRuangRapatAPI().then( res => {
                const data = res.data;
                // The rest of your code goes here.
                // ...
                // ...
                // ...
                console.log(res);
            }).catch( error => {
                console.log(error);
            });
            console.log(res);
            
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'API Insert Ruang Rapat belum dibuat', life: 3000 });
            setRuangRapatDialog(false);
            setRuangRapat(emptyRuangRapat);
        }
    };
    let saveRuangRapatAPI = async () => {
        try {
            const res = await axios.post(process.env.SERVER_API + 'ruangRapat/insertRuangRapat', {
                data: ruangRapat
            }).then( res => {return res});
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const editRuangRapat = (ruang) => {
        setRuangRapat({ ...ruang });
        setRuangRapatDialog(true);
    };

    const confirmDeleteRuangRapat = (ruang) => {
        setRuangRapat(ruang);
        setDeleteRuangRapatDialog(true);
    };

    const deleteRuangRapat = () => {
        // let _products = products.filter((val) => val.id !== product.id);

        // setProducts(_products);
        setDeleteRuangRapatDialog(false);
        setRuangRapat(emptyRuangRapat);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'API Delete Ruang rapat belum dibuat', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteRuangRapatsDialog(true);
    };

    const deleteSelectedRuangRapats = () => {
        // let _products = products.filter((val) => !selectedProducts.includes(val));

        // setProducts(_products);
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
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _ruangrapat = { ...ruangRapat };

        _ruangrapat[`${name}`] = val;

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
                        <Column field="kdaktif" header="Status" sortable style={{ minWidth: '8rem' }} body={kdaktifBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={ruangRapatDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Ruang Rapat" modal className="p-fluid" footer={ruangRapatDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nama Ruang
                    </label>
                    <InputText id="nmrapat" value={ruangRapat.nmrapat} onChange={(e) => onInputChange(e, 'nmrapat')} required autoFocus className={classNames({ 'p-invalid': submitted && !ruangRapat.nmrapat })} />
                    {submitted && !ruangRapat.nmrapat && <small className="p-error">Nama ruang is required.</small>}
                </div>
                
            </Dialog>
            <Dialog visible={deleteRuangRapatDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteRuangRapatDialogFooter} onHide={hideDeleteRuangRapatDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {ruangrapat && (
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