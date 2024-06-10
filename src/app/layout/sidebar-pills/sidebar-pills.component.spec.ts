import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPillsComponent } from './sidebar-pills.component';

describe('SidebarPillsComponent', () => {
  let component: SidebarPillsComponent;
  let fixture: ComponentFixture<SidebarPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
