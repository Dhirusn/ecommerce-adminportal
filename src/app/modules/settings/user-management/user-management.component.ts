import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatedResult, Result } from '../../../models/PaginatedResult.model';
import { IconModule } from '@coreui/icons-angular';
import { cilPencil, cilSearch, cilTrash } from '@coreui/icons';

interface User {
  id: string;
  title: string;
  email: string;
  categories: { name: string }[];
  published: boolean;
  status: string;
  imageUrls: string;
  lastActive: string;
  dateAdded: string;
  access: string[];
}
@Component({
  selector: 'app-user-management',
  imports: [CommonModule,IconModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  icons = { cilSearch, cilPencil, cilTrash };

  users: User[] = [
    {
      id: '1',
      title: 'Florence Shaw',
      email: 'florence@untitledul.com',
      categories: [{ name: 'primary' }, { name: 'success' }],
      published: true,
      status: 'Active',
      imageUrls: 'assets/images/user1.jpg',
      lastActive: 'Mar 4, 2024',
      dateAdded: 'July 4, 2022',
      access: ['Admin', 'Data Export', 'Data Import']
    },
    {
      id: '2',
      title: 'Amélie Laurent',
      email: 'amefie@untitledul.com',
      categories: [{ name: 'info' }, { name: 'warning' }],
      published: true,
      status: 'Active',
      imageUrls: 'assets/images/user2.jpg',
      lastActive: 'Mar 2, 2024',
      dateAdded: 'July 4, 2022',
      access: ['Admin', 'Data Export', 'Data Import']
    },
    {
      id: '3',
      title: 'Ammar Foley',
      email: 'ammar@untitledul.com',
      categories: [{ name: 'danger' }],
      published: false,
      status: 'Active',
      imageUrls: 'assets/images/user3.jpg',
      lastActive: 'Mar 2, 2024',
      dateAdded: 'July 4, 2022',
      access: ['Data Export', 'Data Import']
    },
    {
      id: '4',
      title: 'Caitlyn King',
      email: 'caitlyn@untitledul.com',
      categories: [{ name: 'success' }, { name: 'primary' }],
      published: true,
      status: 'Active',
      imageUrls: 'assets/images/user4.jpg',
      lastActive: 'Mar 6, 2024',
      dateAdded: 'July 4, 2022',
      access: ['Data Export', 'Data Import']
    }
  ];

  paginatedUsers: User[] = [];
  currentPage = 1;
  pageSize = 10;

  // Mock API response
  res: Result<PaginatedResult<User>> = {
    success: true,
    data: {
      pageNumber: 1,
      totalPages: 5,
      totalCount: 44,
      hasPrevious: false,
      hasNext: true,
      items: this.users,
      previousPageNumber: 0,
      nextPageNumber: 2,
      pageSize: 10
    }
  };

  ngOnInit() {
    this.updatePaginatedUsers();
  }

  getBadgeColor(categoryName: string): string {
    const colorMap: { [key: string]: string } = {
      'primary': 'primary',
      'success': 'success',
      'info': 'info',
      'warning': 'warning',
      'danger': 'danger'
    };
    return colorMap[categoryName] || 'secondary';
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.res.data?.hasNext) {
      this.currentPage++;
      this.updatePaginatedUsers();
      // In real app, you would call your API here
    }
  }

  prevPage() {
    if (this.res.data?.hasPrevious) {
      this.currentPage--;
      this.updatePaginatedUsers();
      // In real app, you would call your API here
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
    // In real app, you would call your API here
  }

  viewProduct(userId: string) {
    console.log('View user:', userId);
    // Implement view logic
  }

  openEditForm(user: User) {
    console.log('Edit user:', user);
    // Implement edit logic
  }

  deleteProduct(userId: string) {
    console.log('Delete user:', userId);
    // Implement delete logic
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.res.data!.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
