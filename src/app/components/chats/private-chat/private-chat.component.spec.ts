import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user/user.service';
import { PrivateChatComponent } from './private-chat.component';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

describe('PrivateChatComponent', () => {
  let component: PrivateChatComponent;
  let fixture: ComponentFixture<PrivateChatComponent>;
  let userServiceStub: Partial<UserService>

  beforeEach(async () => {
    userServiceStub = {
      getfriend: function (id: String) {
        return this.friends.find((user: User) => user.userID === id)
      },
      username: 'test',
      friends: [{ userID: 'fwfa21fagw' }],
    }

    await TestBed.configureTestingModule({
      declarations: [PrivateChatComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: UserService, useValue: userServiceStub
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => 'fwfa21fagw'
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
