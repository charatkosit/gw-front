import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDetailTableService } from 'src/app/services/order-detail-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent {

  constructor(private orderDetail: OrderDetailTableService,
    private order: OrderTableService,
    private share: ShareService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  data: any[] = [];
  sumTotal: number = 0
  orderId!: number
  memberId!: string;
  orderData: any;
  modalAddpartData: any;
  modalEditStatusData: any;
  modalEditPartData: any;

  showEditPartModal = false;
  showOrderAddpartModal = false;
  showEditStatusModal = false;

  ngOnInit(): void {
    //รับค่าจาก Order-list
    this.orderId = this.share.orderId;
    this.memberId = this.share.memberId;
    this.loadOrderData(this.orderId, this.memberId);

    this.loadData();
    this.initializeDataTable();
  }

  initializeDataTable() {
    $(document).ready(() => {
      var table = $('#example1').DataTable({
        language: {
          lengthMenu: 'แสดง _MENU_ แถว',
          zeroRecords: 'ไม่พบข้อมูล',
          info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',
          infoEmpty: 'ไม่มีข้อมูลที่ต้องการแสดง',
          infoFiltered: '(กรองจากทั้งหมด _MAX_ แถว)',
          search: 'ค้นหา:',
          paginate: {
            first: 'หน้าแรก',
            last: 'หน้าสุดท้าย',
            next: 'ถัดไป',
            previous: 'ก่อนหน้า'
          }
        },
        stateSave: true,
        info: false,
        search: false,
        paginate: false,
        scrollX: false, // Disable horizontal scroll
        autoWidth: false, // Disable automatic column width calculation
        lengthChange: false, // ไม่แสดงช่องเลือก แสดงแถว 10,25,50,100
        pageLength: 15, //   แสดง 15 แถวตายตัว
        data: this.data,
        order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id', title: 'id', className: "text-center" },
          { data: 'partnumber', title: 'รหัสสินค้า', className: "text-left" },
          { data: 'name', title: 'สินค้า', className: "text-left" },
          { data: 'price', title: 'ราคา', className: "text-center" },
          { data: 'qty', title: 'จำนวน', className: "text-center" },
          { data: 'total', title: 'รวม', className: "text-center" },
          {
            title: 'จัดการ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.token)}`);
              return `  <button class="btn btn-sm btn-primary btn-editPart" data-id="${row.id}">แก้ไข</button>
                      <button class="btn btn-sm btn-danger btn-delete" data-id="${row.id}">ลบ</button>`;
            }
          },
        ]
      });
      $(document).on('click', '.btn-delete', (event: any) => {
        var orderdetailId = $(event.target).data('id');
        console.log(`when delete click: ${orderdetailId}`);
        this.onDeleteOrderdetailAlert(orderdetailId);
      });
      $(document).on('click', '.btn-editPart', (event: any) => {
        var orderdetailId = $(event.target).data('id');
        console.log(`when editPart click: ${orderdetailId}`);
        this.onEditPart(orderdetailId);
      });
    });
  }


  loadOrderData(orderId: number, memberId: string) {
    this.order.findOne(orderId, memberId).subscribe({
      next: (response) => {
        this.orderData = response;
        console.log(`response: ${JSON.stringify(response)}`)
      },
      error: (error) => {
        console.log(`error: ${error}`)
      }
    });

  }

  private loadData(): void {
    this.orderDetail.getOrderDetailByOrderId(this.orderId).subscribe(data => {
      this.data = data;
      //หาผลรวมของ total
      this.sumTotal = this.data.reduce((sum, item) => sum + item.total, 0)

      console.log(`data is ${JSON.stringify(this.data)}`);
      const table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });

  }

  ngOnDestroy(): void {
    try {
      // Your cleanup code or method calls
      this.cleanup();
    } catch (error) {
      console.error('Error during ngOnDestroy:', error);
    }
  }

  private cleanup(): void {
    // Cleanup logic here
    console.log('Cleaning up resources...');
  }

  private reloadDataTable(): void {
    this.loadOrderData(this.orderId, this.memberId);
    this.orderDetail.getOrderDetailByOrderId(this.orderId).subscribe(data => {
      this.data = data;

      //หาผลรวมของ total
      this.sumTotal = this.data.reduce((sum, item) => sum + item.total, 0)

      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //------จัดการที่นี่-------------------------
  onDeleteOrderdetailAlert(orderdetailId: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการลบ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่ ลบ',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderDetail.delete(orderdetailId).subscribe({
          next: response => {
            console.log('OrderDetail deleted successfully', response);
            swalWithBootstrapButtons.fire('รายการถูกลบแล้ว',)
            this.reloadDataTable();
          },
          error: error => {
            console.error('Error deleting car', error);
            swalWithBootstrapButtons.fire('ไม่สามารถ ลบได้', 'มีการใช้รายการนี้ ในการรับงาน')
          }
        });

      }
    })
  }


  close(){
    this.router.navigate(['/garage/order-list'])
  }

  //-------ก่อนไป modal---------------
  onAddpart() {
    this.showOrderAddpartModal = true;
  }


  onEditStatus() {   // ปิดงาน ใส่วิธีการแก้ไข
    this.showEditStatusModal = true;
    this.modalEditStatusData = { orderId: this.orderId }
  }
 
  onEditPart(orderdetailId:number){
    this.showEditPartModal = true;
    this.orderDetail.getOrderDetailById(orderdetailId).subscribe({
      next:(data)=>{
        console.log(`data is :${JSON.stringify(data)}`);
      
        this.modalEditPartData = data;
      },
      error:(error)=>{
        console.log(`error: ${error}`)
      }
    })

  }
  //---กลับมาจาก modal-----------------

  closeOrderAddpartModal() {
    this.showOrderAddpartModal = false;
  }

  closeEditStatusModal() {
    this.showEditStatusModal = false;
  }

  closeEditPartModal(){
    this.showEditPartModal = false;
  }

  onSubmitEditPart(editPartForm: FormGroup){
     const editPartData ={
        partnumber : editPartForm.value.partnumber,
        name:        editPartForm.value.name,
        price:       editPartForm.value.price,
        qty:         editPartForm.value.qty
     }

  }


  onEditStatusSubmit(updateStatusForm: FormGroup) {
    const updateStatusData = {
      status: updateStatusForm.value.status,
      solution: updateStatusForm.value.solution

    }
    const orderId = updateStatusForm.value.orderId;
    this.order.update(+orderId, updateStatusData).subscribe({
      next: response => {
        console.log('order updated successfully', response);
        this.reloadDataTable();
        this.showEditStatusModal = false;
      },
      error: error => {
        console.error('Error updating order', error);
      }
    });

  }

  onSubmitAddPart(orderAddpartForm: FormGroup) {
    const orderAddpartData = {
      partnumber: orderAddpartForm.value.partnumber,
      name: orderAddpartForm.value.name,
      price: orderAddpartForm.value.price,
      qty: orderAddpartForm.value.qty,
      orderId: this.orderId
    }
    this.orderDetail.create(this.memberId, orderAddpartData).subscribe({
      next: (data) => {
        console.log(`add part success :${data}`)
        this.reloadDataTable();
        this.showOrderAddpartModal = false;
      },
      error: (error) => {
        console.log(`error: ${error}`)
      }
    })
  }
}
