import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AtGuard } from './guards/at.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AtGuard)
  @Get()
  getHello(@Req() req) {
    console.log(req.cookies);
    return 'fuck you';
  }

  @Get('out')
  getout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', { expires: 0 });
  }

  @Get('in')
  getin(@Res({ passthrough: true }) res) {
    res.cookie(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsInVzZXJuYW1lIjoiQWRtaW4iLCJpYXQiOjE3MDQ5ODk3ODksImV4cCI6MTcwNTA3NjE4OX0.Me4JE-nUOAIsmmi5zmvtJnp_oqe7d4Y-a9M-EDBTfoQ',
    );
  }
}
