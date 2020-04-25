import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventResponse, EmergencyEvent, Acknowledgement } from '../interfaces';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  eventId: number;
  eventResonse: EventResponse;
  event: EmergencyEvent;
  acknowledgements: Acknowledgement[] = [];
  newNote = '';

  constructor(private route: ActivatedRoute, private eventService: EventsService) { }

  async ngOnInit() {
    this.eventId = +this.route.snapshot.params['eventId'];
    this.eventResonse = await this.eventService.getById(this.eventId).toPromise();
    this.event = this.eventResonse.event;
    this.acknowledgements = await this.eventService.getAcknowledgements(this.eventResonse).toPromise();
  }

}
